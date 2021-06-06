//API
var cur_ctx;
var cur_filename;
var img_ratio = 5;

//first displayed image
function CR2toJpg_api(cvs, src) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:5000/CR2toJpg";
    var data = JSON.stringify({location: src});

    xhr.responseType = 'json';
    
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            var res = xhr.response;
            console.log("CR2toJpg_API_response: Output location is ", res["output location"].slice(0, 20));
            
            //render image
            var img = new Image();
            img.src = "data:image/jpg;base64," + res["output location"];
            console.log("data:image/jpg;base64," + res["output location"].slice(0, 20))
            img.onload = function() { 
                if (cvs == 0){
                    ctx.drawImage(this, 0, 0, canvas.width, canvas.width * this.height / this.width)
                    document.getElementById("processMessage1").innerHTML = "Move the mouse on the standard point, and press W to do white balance.";
                }
                else{
                    ctx2.drawImage(this, 0, 0, canvas2.width, canvas2.width * this.height / this.width)
                    document.getElementById("processMessage2").innerHTML = "Move the mouse on the standard point, and press W to do white balance.";
                }
            }
        }     
    }
    xhr.onerror= () =>{
        // alert("Failed.");
        alert("請將圖片存於指定資料夾(資料夾名稱：img)");
        // alert("Please import CR2 file.");
    };
    
    xhr.open("POST", url); 
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

//get the mouse position after pressing whitespace
document.addEventListener("mousemove", record_coor);
document.addEventListener("keypress", e => {if ((e.key).toLowerCase() == 'w') wb_interface()});

//When mouse moved,
//record which canvas mouse is pointing at
//and mouse position.
function record_coor(e){
    var x = e.offsetX;
    var y = e.offsetY;
    if(e.target == canvas){
        document.getElementById("coordinate").innerHTML = `Left (x,y)=${x},${y}`;
    }
    else if(e.target == canvas2){
        document.getElementById("coordinate").innerHTML = `Right (x,y)=${x},${y}`;
    }
    else{
        document.getElementById("coordinate").innerHTML = "";
    }
}

//An interface for white balance
function wb_interface(){
    var coor = document.getElementById("coordinate").innerHTML;
    var pos1 = coor.indexOf('=');
    var pos2 = coor.lastIndexOf(',');
    var pos_x = parseInt(coor.slice(pos1 + 1, pos2));
    var pos_y = parseInt(coor.slice(pos2 + 1, coor.length));
    if(coor.indexOf("Left") == 0){
        cur_ctx = 0;
        cur_filename = filename1;
        console.log("Left");
    }
    else if(coor.indexOf("Right") == 0){
        cur_ctx = 1;
        cur_filename = filename2;
        console.log("Right");
    }
    else{
        console.log("Others");
        cur_ctx = -1;
    }
    console.log(cur_filename);

    if(cur_ctx == -1){
        alert("The mouse is out of the canvases.");
    }
    else if(cur_filename == null){
        alert("Please import images first.");
    }
    else{
        document.getElementById("processMessage" +(cur_ctx + 1)).innerHTML = "white balance processing...";
        whiteBalance_api(cur_ctx, cur_filename, pos_x*img_ratio, pos_y*img_ratio);
    }
}


//second displayed image
function whiteBalance_api(cvs, src, pos_x, pos_y) {

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:5000/whiteBalance";
    var data = JSON.stringify({location: src, x: pos_x, y: pos_y });

    xhr.responseType = 'json';
    
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            var res = xhr.response;
            console.log("whiteBalance_response: Output location is ", res["output location"].slice(0, 20));
            
            //render image
            var img = new Image();
            img.src = "data:image/jpg;base64," + res["output location"];
            console.log("data:image/jpg;base64," + res["output location"].slice(0, 20))
            img.onload = function() {
                if (cvs == 0){
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.width * this.height / this.width)
                    document.getElementById("processMessage1").innerHTML = "Already adjusted to LAB(79, 0, 0)!";
                }
                else{
                    ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.width * this.height / this.width)
                    document.getElementById("processMessage2").innerHTML = "Already adjusted to LAB(79, 0, 0)!";
                }
            }
        }       
    }    
    xhr.onerror= () =>{
        alert("Failed");
    };
    xhr.open("POST", url); 
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}



