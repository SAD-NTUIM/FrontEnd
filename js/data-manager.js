var text = [["Brand", "Product", "Shade", "Thickness", "", "Black", "", "", "White", ""]];

function clearNotAll () {
    // clear image   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    //clear circles' color
    circles = document.getElementsByClassName('circle');
    for(var i = 0; i < circles.length; i++){
        circles[i].style.backgroundColor = 'rgb(255,255,255)';
    }
    
    //clear thickness, rgb-black, rgb-white
    for (var i = 6; i <= 10; i++) {
        ID = "rgb" + i;
        document.getElementById(ID).innerHTML = "new, new, new";
    }  
    for(var i = 1; i <= (circles.length/2); i++){
        ID = "c" + i;
        document.getElementById(ID).value = "";                
        ID = "rgb" + i;
        document.getElementById(ID).innerHTML = "new, new, new";
    }

    //clear process messages
    document.getElementById("processMessage1").innerHTML = "";
    document.getElementById("processMessage2").innerHTML = "";
    
    //clear file info
    filename1 = "";
    filename2 = "";
    cur_ctx = -1;
    cur_filename = "";
}

function clearAll() {
    clearNotAll();
    document.getElementById("brand").value = "";
    document.getElementById("product").value = "";
    document.getElementById("shade").value = "";
}

function saveAndClear() {

    var canSave = false;
    var rgbBox = document.getElementsByClassName("rgb_box");

    //product name is a must-have.
    if(document.getElementById("product").value == ""){
        canSave = false;
        alert("Please fill in the product name.");
    }
    // At least one rgb_box is not empty.
    else{
        for(var i = 0; i < 10; i++){
            if(rgbBox[i].innerHTML != "new, new, new"){
                canSave = true;
                break;
            }
        }
        if(!canSave){
            alert("Need at least one RGB value.");        
        }
    }

    if(canSave){
        for (var i = 1; i <= 5; i++) {
            var temp = [];
            //save brand, product, shade
            temp.push(document.getElementById("brand").value);
            temp.push(document.getElementById("product").value);
            temp.push(document.getElementById("shade").value);
    
            //save thickness, rgb-black, rgb-white
            ID = "c" + i;
            temp.push(document.getElementById(ID).value);
            ID = "rgb" + i;
            temp.push(document.getElementById(ID).innerHTML);
            ID = "rgb" + (i + 5);
            temp.push(document.getElementById(ID).innerHTML);
            text.push(temp);
        }     
        for(var i = 0; i < text.length; i++){
            console.log(text[i]);
        }
        clearNotAll();
    }
}

function exportAll() {
        var Today = new Date();
        var fileName = "樹脂資料庫"+ "_" + document.getElementById("product").value + "_" +
        Today.getFullYear().toString() + 
        ("0"+ (Today.getMonth()+1).toString()).slice(-2) +
        ("0" + Today.getDate().toString()).slice(-2);
        
        let csvContent = "data:text/csv;charset=utf-8," + text.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName + ".csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
        clearAll();

        //clear the text array
        text.length = 0;
        
}