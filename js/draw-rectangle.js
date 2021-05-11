var canvas, canvas2, ctx, ctx2, rect, drag, brush, brush2;
var circles, circle_index, last_time_bcircle, last_time_wcircle;

function draw_rectangle_init() {
    // 初始化
    canvas = document.getElementById('cvs1'),
        canvas2 = document.getElementById('cvs2'),
        ctx = canvas.getContext('2d'),
        ctx2 = canvas2.getContext('2d'),
        rect = {},
        drag = false,
        brush = document.getElementById('brush'),
        brush2 = document.getElementById('brush2'); // 選取框框

    circles = document.getElementsByClassName('circle');
    circles = Array.from(circles);
    // 滑鼠點擊選取圓圈監聽器
    circles.forEach(circle => {
        circle.addEventListener('click', selectCircle);
    });
    circle_index = 0;
    circles[circle_index].style.borderColor = 'pink';
    circles[circle_index].style.borderWidth = '8px';


    // 鍵盤選取圓圈監聽器
    document.addEventListener('keydown', e => {
        if (e.key == 'ArrowLeft' || (e.key).toLowerCase() == 'a') {
            selectCircle('Left');
        } else if (e.key == 'ArrowRight' || (e.key).toLowerCase() == 'd') {
            selectCircle('Right');
        }
    });

    // 加入事件監聽器
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas2.addEventListener('mousedown', mouseDown, false);
    canvas2.addEventListener('mouseup', mouseUp, false);
    canvas2.addEventListener('mousemove', mouseMove, false);
    console.log('draw_rectangel module initialized');
}

function selectCircle(e) {
    // 將原本的圓圈邊框顏色變回，並將選擇的圓圈邊框顏色改變
    circles[circle_index].style.borderColor = 'grey';
    circles[circle_index].style.borderWidth = '3px';
    if (e == 'Left') {
        if (circle_index == 0) {
            circle_index = 9;
        } else {
            circle_index = (circle_index - 1) % 10;
        }
        circles[circle_index].style.borderColor = 'pink';
        circles[circle_index].style.borderWidth = '8px';
        console.log('Select circle to the left!');
    } else if (e == 'Right') {
        circle_index = (circle_index + 1) % 10;
        circles[circle_index].style.borderColor = 'pink';
        circles[circle_index].style.borderWidth = '8px';
        console.log('Select circle to the right!');
    } else {
        circle_index = Number(e.target.id) - 1;
        e.target.style.borderColor = 'pink';
        e.target.style.borderWidth = '8px';
        console.log('Select circle by clicking!');
    }
}

function mouseDown(e) {
    // 當滑鼠按下，紀錄滑鼠座標當作框框的起始座標
    //rect.startX = e.pageX - canvas.offsetLeft;
    //rect.startY = e.pageY - canvas.offsetTop;
    rect.startX = e.offsetX;
    rect.startY = e.offsetY;

    drag = true;
}

function mouseUp(e) {
    // 當滑鼠放開，開始計算框框內RGB值
    drag = false;
    calculateRGB(e.target);
}

function mouseMove(e) {
    if (drag) {
        // 當拖曳，紀錄座標當作框框的高寬
        // rect.w = (e.pageX - this.offsetLeft) - rect.startX;
        // rect.h = (e.pageY - this.offsetTop) - rect.startY;
        rect.w = e.offsetX - rect.startX;
        rect.h = e.offsetY - rect.startY;
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        draw(e.target);

    }
}

function draw(target) {
    // 畫出框框
    if (target == canvas) {
        brush.style.width = rect.w + 'px';
        brush.style.height = rect.h + 'px';
        brush.style.left = rect.startX + 'px';
        brush.style.top = rect.startY + 'px';
    } else if (target == canvas2) {
        brush2.style.width = rect.w + 'px';
        brush2.style.height = rect.h + 'px';
        brush2.style.left = rect.startX + 'px';
        brush2.style.top = rect.startY + 'px';
    }

}

const calculateRGB = (target) => {

    // 計算RGB值
    console.log("calculating RGB")
    let data;
    if (target == canvas) {
        data = ctx.getImageData(rect.startX, rect.startY, rect.w, rect.h).data;
    } else if (target == canvas2) {
        data = ctx2.getImageData(rect.startX, rect.startY, rect.w, rect.h).data;
    }

    let R = 0;
    let G = 0;
    let B = 0;
    let A = 0;

    const components = data.length;

    for (let i = 0; i < components; i += 4) {
        // A single pixel (R, G, B, A) will take 4 positions in the array:
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Update components for solid color and alpha averages:
        R += r;
        G += g;
        B += b;
        A += a;
    }

    const pixelsPerChannel = components / 4;

    // The | operator is used here to perform an integer division:

    R = R / pixelsPerChannel | 0;
    G = G / pixelsPerChannel | 0;
    B = B / pixelsPerChannel | 0;

    console.log(`(R, G, B)`);
    console.log(`(${R}, ${G}, ${B})`);

    // 改變對應圓圈顏色
    circles[circle_index].style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}