var canvas, ctx, rect, drag, brush;

function draw_rectangle_init() {
    // 初始化
    canvas = document.getElementById('cvs1'),
        ctx = canvas.getContext('2d'),
        rect = {},
        drag = false,
        brush = document.getElementById('brush'); // 選取框框

    // 加入事件監聽器
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mousemove', mouseMove, false);
    console.log('draw_rectangel module initialized');
}

function mouseDown(e) {
    // 當滑鼠按下，紀錄滑鼠座標當作框框的起始座標
    rect.startX = e.pageX - canvas.offsetLeft;
    rect.startY = e.pageY - canvas.offsetTop;
    drag = true;
}

function mouseUp() {
    // 當滑鼠放開，開始計算框框內RGB值
    drag = false;
    calculateRGB();
}

function mouseMove(e) {
    if (drag) {
        // 當拖曳，紀錄座標當作框框的高寬
        rect.w = (e.pageX - this.offsetLeft) - rect.startX;
        rect.h = (e.pageY - this.offsetTop) - rect.startY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        draw();

    }
}

function draw() {
    // 畫出框框
    brush.style.width = rect.w + 'px';
    brush.style.height = rect.h + 'px';
    brush.style.left = rect.startX + 'px';
    brush.style.top = rect.startY + 'px';
}

const calculateRGB = () => {

    // 計算RGB值
    console.log("calculating RGB")
    const data = ctx.getImageData(rect.startX, rect.startY, rect.w, rect.h).data;

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
    const circle = document.getElementById('circle1');
    circle.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
}