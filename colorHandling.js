
function init() {
    var url = document.URL + 'led/';
    var jqxhr = $.getJSON(url, function (data) {

        var btnTop = document.getElementById("colTop");
        var btnRight = document.getElementById("colRight");
        var btnBot = document.getElementById("colBot");
        var btnLeft = document.getElementById("colLeft");

        var colPickerTop = btnTop.jscolor;
        var colPickerRight = btnRight.jscolor;
        var colPickerBot = btnBot.jscolor;
        var colPickerLeft = btnLeft.jscolor;

        colPickerTop.rgb[0] = data[0]['R1'];
        colPickerTop.rgb[1] = data[0]['G1'];
        colPickerTop.rgb[2] = data[0]['B1'];

        colPickerRight.rgb[0] = data[0]['R2'];
        colPickerRight.rgb[1] = data[0]['G2'];
        colPickerRight.rgb[2] = data[0]['B2'];

        colPickerBot.rgb[0] = data[0]['R3'];
        colPickerBot.rgb[1] = data[0]['G3'];
        colPickerBot.rgb[2] = data[0]['B3'];

        colPickerLeft.rgb[0] = data[0]['R4'];
        colPickerLeft.rgb[1] = data[0]['G4'];
        colPickerLeft.rgb[2] = data[0]['B4'];


        var colStrTop = "rgb(" + Math.round(colPickerTop.rgb[0]) + ", " + Math.round(colPickerTop.rgb[1]) + ", " + Math.round(colPickerTop.rgb[2]) + ")";
        var colStrRight = "rgb(" + Math.round(colPickerRight.rgb[0]) + ", " + Math.round(colPickerRight.rgb[1]) + ", " + Math.round(colPickerRight.rgb[2]) + ")";
        var colStrBot = "rgb(" + Math.round(colPickerBot.rgb[0]) + ", " + Math.round(colPickerBot.rgb[1]) + ", " + Math.round(colPickerBot.rgb[2]) + ")";
        var colStrLeft = "rgb(" + Math.round(colPickerLeft.rgb[0]) + ", " + Math.round(colPickerLeft.rgb[1]) + ", " + Math.round(colPickerLeft.rgb[2]) + ")";

        btnTop.style.background = colStrTop;
        btnRight.style.background = colStrRight;
        btnBot.style.background = colStrBot;
        btnLeft.style.background = colStrLeft;

        btnTop.style.boxShadow = "0px 0px 25px 5px " + colStrTop;
        btnRight.style.boxShadow = "0px 0px 25px 5px " + colStrRight;
        btnBot.style.boxShadow = "0px 0px 25px 5px " + colStrBot;
        btnLeft.style.boxShadow = "0px 0px 25px 5px " + colStrLeft;

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.lineWidth = 50;
        ctx.rainbowRect(25, 25, 200, 200, "white", colStrTop, colStrRight, colStrBot, colStrLeft);
        canvas.addEventListener('click', openColorPicker);
    });
}

function setColorAndPost() {
    var btnTop = document.getElementById("colTop");
    var btnRight = document.getElementById("colRight");
    var btnBot = document.getElementById("colBot");
    var btnLeft = document.getElementById("colLeft");

    var colPickerTop = btnTop.jscolor;
    var colPickerRight = btnRight.jscolor;
    var colPickerBot = btnBot.jscolor;
    var colPickerLeft = btnLeft.jscolor;

    var r1 = Math.round(colPickerTop.rgb[0]);
    var g1 = Math.round(colPickerTop.rgb[1]);
    var b1 = Math.round(colPickerTop.rgb[2]);
    var r2 = Math.round(colPickerRight.rgb[0]);
    var g2 = Math.round(colPickerRight.rgb[1]);
    var b2 = Math.round(colPickerRight.rgb[2]);
    var r3 = Math.round(colPickerBot.rgb[0]);
    var g3 = Math.round(colPickerBot.rgb[1]);
    var b3 = Math.round(colPickerBot.rgb[2]);
    var r4 = Math.round(colPickerLeft.rgb[0]);
    var g4 = Math.round(colPickerLeft.rgb[1]);
    var b4 = Math.round(colPickerLeft.rgb[2]);

    var colStrTop = "rgb(" + r1 + ", " + g1 + ", " + b1 + ")";
    var colStrRight = "rgb(" + r2 + ", " + g2 + ", " + b2 + ")";
    var colStrBot = "rgb(" + r3 + ", " + g3 + ", " + b3 + ")";
    var colStrLeft = "rgb(" + r4 + ", " + g4 + ", " + b4 + ")";

    btnTop.style.boxShadow = "0px 0px 25px 5px " + colStrTop;
    btnRight.style.boxShadow = "0px 0px 25px 5px " + colStrRight;
    btnBot.style.boxShadow = "0px 0px 25px 5px " + colStrBot;
    btnLeft.style.boxShadow = "0px 0px 25px 5px " + colStrLeft;

    document.getElementById("canvas").getContext("2d").rainbowRect(25, 25, 200, 200, "white", colStrTop, colStrRight, colStrBot, colStrLeft);

    postColor(r1, g1, b1, r2, g2, b2, r3, g3, b3, r4, g4, b4);
}

// e is click-event
function openColorPicker(e) {
    var canvRect = canvas.getBoundingClientRect();
    var dLeft = e.clientX - canvRect.left;
    var dRight = canvRect.right - e.clientX;
    var dBot = canvRect.bottom - e.clientY;
    var dTop = e.clientY - canvRect.top;

    if (dLeft < dRight && dLeft < dTop && dLeft < dBot && dLeft * 5 <= canvRect.width) {
        document.getElementById("colLeft").jscolor.show();
    } else if (dRight < dTop && dRight < dBot && dRight * 5 <= canvRect.width) {
        document.getElementById("colRight").jscolor.show();
    } else if (dTop < dBot && dTop * 5 <= canvRect.height) {
        document.getElementById("colTop").jscolor.show();
    } else if (dBot * 5 <= canvRect.height) {
        document.getElementById("colBot").jscolor.show();
    }
}

function postColor(r1, g1, b1, r2, g2, b2, r3, g3, b3, r4, g4, b4) {
    var details = {
        'R1': r1,
        'G1': g1,
        'B1': b1,
        'R2': r2,
        'G2': g2,
        'B2': b2,
        'R3': r3,
        'G3': g3,
        'B3': b3,
        'R4': r4,
        'G4': g4,
        'B4': b4,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(document.URL + 'color/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
}
