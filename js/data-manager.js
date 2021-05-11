var text = [["Brand", "Product", "Shade", "Thickness", "", "Black", "", "", "White", ""]];

function clearNotAll () {
    for(var i = 1; i <= 5; i++){
        ID = "c" + i;
        document.getElementById(ID).value = "";                
        ID = "rgb" + i;
        document.getElementById(ID).innerHTML = "255, 222, 173";
    }
    //clear thickness, rgb-black, rgb-white
    for (var i = 6; i <= 10; i++) {
        ID = "rgb" + i;
        document.getElementById(ID).innerHTML = "255, 222, 173";
    }  
}

function clearAll() {
    clearNotAll();
    document.getElementById("brand").value = "";
    document.getElementById("product").value = "";
    document.getElementById("shade").value = "";
}

function saveAndClear() {
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
        link.setAttribute("download", fileName+".csv");
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
        clearAll();

        //clear the text array
        text.length = 0;
        
}