
var canvas;
var ctx;
var maxSpeed = 200;
var currentSpeed = 0;
let allowedSpeed = 0;

function draw(speed, allowedSpeed1) {
    canvas = document.getElementById("tutorial");
    ctx = canvas.getContext("2d");
    currentSpeed = parseFloat(speed);
    if (isNaN(currentSpeed)) { currentSpeed = 0; }
    if (currentSpeed < 0) { currentSpeed = 0; }
    if (currentSpeed > maxSpeed) { currentSpeed = maxSpeed; }

    allowedSpeed = parseFloat(allowedSpeed1);

    if (isNaN(allowedSpeed)) { allowedSpeed = 0; }
    if (allowedSpeed < 0) { allowedSpeed = 0; }
    if (allowedSpeed > maxSpeed) { allowedSpeed = maxSpeed; }
    drawSpeedometer();

    console.log(allowedSpeed);
}

function drawSpeedometer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2 + 10;
    var radius = 190;

    // Угол начала и конца шкалы
    var startAngle = 120 * Math.PI / 180;
    var endAngle = 420 * Math.PI / 180;

    // Фон спидометра
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = "#222";
    ctx.fill();
    if (allowedSpeed > 0) {
        drawSpeedometerFill(ctx, centerX, centerY, radius, startAngle, endAngle, allowedSpeed);
    }




    // Ободок
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0 * Math.PI / 180, 360 * Math.PI / 180, false);

    ctx.lineWidth = 8;
    ctx.strokeStyle = "#888";
    ctx.stroke();

    // Шкала
    //console.error("drawScale");
    drawScale(
        centerX,
        centerY,
        radius,
        startAngle,
        endAngle
    );

   // сonsole.error("drawNeedle");

    // Стрелка
    drawNeedle(
        centerX,
        centerY,
        radius,
        startAngle,
        endAngle
    );

    //console.error("drawSpeedometerFill");

    // Значение скорости
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.fillText(
        Math.round(currentSpeed) + " km/h",
        centerX,
        centerY + 50
    );
}

// Заполненная часть: до currentSpeed одним цветом, после другим
function drawSpeedometerFill(
    ctx,
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle,
    allowedSpeed
) {
    var fillAngle =
        startAngle +
        (allowedSpeed / maxSpeed) *
        (endAngle - startAngle);

    ctx.beginPath();

    ctx.moveTo(centerX, centerY);

    ctx.arc(
        centerX,
        centerY,
        radius - 18,
        startAngle,
        fillAngle,
        false
    );

    ctx.lineTo(centerX, centerY);

    ctx.closePath();

    ctx.fillStyle = "#006700";
    ctx.fill();

    /*fillAngle =
        endAngle -
        (allowedSpeed / maxSpeed) *
        (endAngle - startAngle);;*/

    ctx.beginPath();

    ctx.moveTo(centerX, centerY);

    ctx.arc(
        centerX,
        centerY,
        radius - 18,
        fillAngle,
        endAngle,
        false
    );

    ctx.lineTo(centerX, centerY);

    ctx.closePath();

    ctx.fillStyle = "#5c0000";
    ctx.fill();

}


function drawScale(
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle
) {
    //alert("ЭТА ФУНКЦИЯ ЗАПУСТИЛАСЬ");
    for (var i = 0; i <= maxSpeed; i += 1) {

        var angle =
            startAngle +
            (i / maxSpeed) *
            (endAngle - startAngle);


        let outerRadius = radius - 10;
        let innerRadius;

        if (i % 10 === 0) {
            innerRadius = radius - 30;
        } else {
            innerRadius = radius - 20;
        }


        let outerX =
            centerX +
            Math.cos(angle) * outerRadius;

        let outerY =
            centerY +
            Math.sin(angle) * outerRadius;

        let innerX =
            centerX +
            Math.cos(angle) * innerRadius;

        let innerY =
            centerY +
            Math.sin(angle) * innerRadius;

        // Отметка
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);

        ctx.lineWidth = i % 10 === 0 ? 3 : 2;
        ctx.strokeStyle = "white";
        ctx.stroke();

        if (i % 10 === 0) {
            // Число
            var textX =
                centerX +
                Math.cos(angle) *
                (radius - 55);

            var textY =
                centerY +
                Math.sin(angle) *
                (radius - 55);

            ctx.font = "14px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(i, textX, textY);
        }
    }
}


function drawNeedle(
    centerX,
    centerY,
    radius,
    startAngle,
    endAngle
) {
    var angle =
        startAngle +
        (currentSpeed / maxSpeed) *
        (endAngle - startAngle);

    var needleX =
        centerX +
        Math.cos(angle) *
        (radius - 45);

    var needleY =
        centerY +
        Math.sin(angle) *
        (radius - 45);

    // Стрелка
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);

    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.stroke();

    // Центральный круг
    ctx.beginPath();
    ctx.arc(
        centerX,
        centerY,
        12,
        0,
        2 * Math.PI
    );

    ctx.fillStyle = "#555";
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.stroke();
}

