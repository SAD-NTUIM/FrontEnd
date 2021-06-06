var filename1, filename2;

function image_io_init() {
    canvas = document.getElementById('cvs1'),
    canvas2 = document.getElementById('cvs2'),
    ctx = canvas.getContext('2d'),
    ctx2 = canvas2.getContext('2d'),
    console.log('image-io-manager module initialized');
}

function loadfile1(input) {
    document.getElementById("processMessage1").innerHTML = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var file_d = input.files[0]; 
    filename1 = file_d["name"];
    console.log("filename: ", filename1);
    document.getElementById("processMessage1").innerHTML = "processing...";
    CR2toJpg_api(0, filename1);

}

function loadfile2(input) {
    document.getElementById("processMessage2").innerHTML = "";
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    var file_d = input.files[0]; 
    filename2 = file_d["name"];
    console.log("filename: ", filename2);
    document.getElementById("processMessage2").innerHTML = "processing...";
    CR2toJpg_api(1, filename2);
}

