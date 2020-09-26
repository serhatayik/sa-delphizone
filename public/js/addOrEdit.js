    //FileUp değerini fileTexte atayarak 
    //hem URL hem FilePathden gelecek veriyi kullanarak resim yükleyebileceğim
    function fileUpActive(){
            
            var fileUp = document.getElementById("fileUp");
            var fileText = document.getElementById("fileText");           
    }
    
    function degistirText(){
        
        if (fileUp.value!=fileText.value)
            {
                fileUp.value="";
            }
    }
    //
    function ekleText(){
        var subfile=basename(fileUp.value);
        fileText.value=subfile;
        if (fileText.value!=fileUp.value)
            {
                fileText.value=subfile;
            }
    }
    //Fakepathi bazı tarayıcılarda silmek için
    function basename(path) {
        return path.replace(/\\/g,'/').replace( /.*\//, '' );
    }