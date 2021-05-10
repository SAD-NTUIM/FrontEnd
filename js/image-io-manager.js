var ctx1, ctx2, btn1;

function image_io_init() {
    btn1 = document.getElementById("btn_1");
    cvs = document.getElementById("cvs"); //畫布
    ctx1 = cvs1.getContext("2d"); //畫布內容左
    ctx2 = cvs2.getContext("2d"); //畫布內容左
    // 事件物件
    var handler = function(e) {
            //var that = this;
        }
        // btn1.addEventListener("click",handler);
    console.log('image_io_manager module initialized')
}

function loadfile1(input) {
    var file = input.files[0]; //獲取檔案
    var src = URL.createObjectURL(file); //把檔案換成可用的網址
    var img = new Image();
    img.src = src;
    img.onload = function() { //載入影像
        ctx1.drawImage(this, 0, 0, 450, 450)
    }
}

function loadfile2(input) {
    var file = input.files[0]; //獲取檔案
    var src = URL.createObjectURL(file); //把檔案換成可用的網址
    var img = new Image();
    img.src = src;
    img.onload = function() { //載入影像
        ctx2.drawImage(this, 0, 0, 450, 450)
    }
}

function clearall() {
    cvs.height = cvs.height;
}