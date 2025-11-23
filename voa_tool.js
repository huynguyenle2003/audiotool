(function(){

    // Remove old box if exists
    var old = document.getElementById("audioToolBox2");
    if (old) old.remove();

    var audio = document.querySelector("audio");
    if (!audio) {
        alert("Không tìm thấy <audio>!");
        return;
    }

    // Create UI
    var box = document.createElement("div");
    box.id = "audioToolBox2";
    Object.assign(box.style, {
        position: "fixed",
        top: "20px",
        left: "20px",
        background: "#fff",
        border: "2px solid #000",
        padding: "12px",
        width: "300px",
        zIndex: 999999,
        fontFamily: "Arial",
        boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
    });

    box.innerHTML =
        "<b>AUDIO TOOL</b><br><br>" +
        "Start: <input id='startInput2' value='0:00' style='width:60px;'>" +
        " <button id='getStart2'>Get</button>" +
        " <button id='playStartBtn2'>Play Start</button><br><br>" +
        "End: <input id='endInput2' value='0:05' style='width:60px;'>" +
        " <button id='getEnd2'>Get</button><br><br>" +
        "<button id='playBtn2'>Play</button> " +
        "<button id='pauseBtn2'>Pause</button> <input id="backValue" value="5" style="width:40px;"> s
<button id="backCustomBtn">⏪ Back</button> <br><br>" +
        "<button id='loopBtn2' style='width:100%;'>Loop OFF</button><br><br>" +
        "<button id='closeBtn2' style='width:100%;'>Close</button>";

    document.body.appendChild(box);

    // Utilities
    function fmt(t) {
        var m = Math.floor(t / 60);
        var s = Math.floor(t % 60);
        return m + ":" + String(s).padStart(2, "0");
    }

    function prs(str) {
        var a = str.split(":");
        return parseInt(a[0] || 0) * 60 + parseInt(a[1] || 0);
    }

    // Buttons
    document.getElementById("getStart2").onclick = function () {
        document.getElementById("startInput2").value = fmt(audio.currentTime);
    };

    document.getElementById("getEnd2").onclick = function () {
        document.getElementById("endInput2").value = fmt(audio.currentTime);
    };

    document.getElementById("playBtn2").onclick = function () {
        audio.play();
    };

    document.getElementById("pauseBtn2").onclick = function () {
        audio.pause();
    };

    document.getElementById("backCustomBtn").onclick = function () {
    let sec = parseFloat(document.getElementById("backValue").value) || 0;
    audio.currentTime = Math.max(0, audio.currentTime - sec);
};

    
    document.getElementById("playStartBtn2").onclick = function () {
        audio.currentTime = prs(document.getElementById("startInput2").value);
        audio.play();
    };

    var loopTimer2 = null;

    document.getElementById("loopBtn2").onclick = function () {

        if (loopTimer2) {
            clearInterval(loopTimer2);
            loopTimer2 = null;
            //alert("Loop OFF");
            document.getElementById("loopBtn2").textContent = "Loop OFF";
            return;
        }

        var start = prs(document.getElementById("startInput2").value);
        var end = prs(document.getElementById("endInput2").value);

        audio.currentTime = start;
        audio.play();

        loopTimer2 = setInterval(function () {
            if (audio.currentTime >= end) {
                audio.currentTime = start;
                audio.play();
            }
        }, 150);

        //alert("Loop ON");
        document.getElementById("loopBtn2").textContent = "Loop ON";
    };

    document.getElementById("closeBtn2").onclick = function () {
        if (loopTimer2) clearInterval(loopTimer2);
        box.remove();
    };

})();
