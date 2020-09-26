const express = require('express');
const mongoose = require('mongoose');
const Image = mongoose.model('Image');
var router = express.Router();
var UplaodPath='/public/images/';



// GET işlemiyle geldiğinde addOrEdit Formumuzu basıyoruz!
router.get('/addOrEdit',(req,res,next)=>{
    
    res.render("component/addOrEdit",{
        viewTitle:"Yeni Resim Ekleme"
    });
    
});

// POST işlemiyle geldiğinde insertRecord Fonksiyonu çağrılır.Aksi durumlarda updateRecord fonksiyonu
router.post('/addOrEdit/',(req,res,next)=>{
    if(req.body.id=='')
        insertRecord(req,res);
        else
        updateRecord(req,res);
});

// POST :id değeri aldıysa updateRecord fonksiyonu çağrılır. Aksi durumda insertRecord 
router.post('/addOrEdit/:id',(req,res,next)=>{
    if(!req.body.id)
        updateRecord(req,res);
        else
        insertRecord(req,res);
});
router.put('/addOrEdit/:id',(req,res,next)=>{
        updateRecord(req,res);
});

// GET /list rotasından gelen istek için Tüm kayıtların listelendiği list.hbs sayfası render edilir.
router.get('/list',(req,res,next)=>{
    Image.find((err,docs)=>{//Tüm bulunan kayıtlar docs dökümanına aktarılıyor.
        if(!err) {
            res.render('component/list',{
                viewTitle:"Kayıt Listesi",
                list: docs //dökümanı render ettiğimizde sayfada kullanmak için bir list dökümanı ile eşitliyoruz
            });
        }
        else{
            console.log('Resimler yüklenirken bir hata meydana geldi.! : '+err);
        }
    });
});

// / Ana Dizin GET  rotasıyla gelen isteklerde AnaSayfadaki resimleri post ediyoruz
router.get('/',(req,res,next)=>{
    Image.find((err,docs)=>{
        if(!err) {
            res.render('component/hoverbox',{
                list: docs
            });
        }
        else{
            console.log('Resimler yüklenirken bir hata meydana geldi.! : '+err);
        }
    });
});

//Resmin Güncelleme Sayfasını render ediyoruz
router.get('/:id', (req,res,next) => {
    Image.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("component/addOrEdit", {
                viewTitle: "Resim Güncelleme",
                'viewUrl': doc.url,
                'viewName': doc.name,
                'viewId': doc.id,
                'list': doc
            });
        }
    });
});

//Resmin Tek görselini bastırıyoruz
router.get('/view/:id', (req,res,next) => {
    Image.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("component/viewImage",{
                'list': doc
            });
            
        }
    });
});

//Resmi silmek için delete rotasına gelen id li resim kayıttan silinir
router.get('/delete/:id', (req,res,next) => {
    deleteRecord(req.params.id,res);//DeleteRecord Functionu çağrı
});

///////////////////INSERT////////////////
function insertRecord(req,res){
    ////////////DB SAVE//////////////
    console.log(UplaodPath);
    var image=new Image();
    if(req.files){
        image.url=UplaodPath+req.body.fileText;
    }else{
        image.url=req.body.fileText;
    }
    image.name=req.body.name;
    image.save((err,doc)=>{
        if(!err)
        res.redirect('/list');
        else {
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("component/addOrEdit",{
                    viewTitle:"Yeni Resim Ekleme"
                });
            }
            else console.log('Kayıt sırasında bir sorun oluştu! : ' +err);
        }
    })              
    if (req.files){
        uploadImage(req,res);  //uploadImage Functionu çağrı
    }
      
}
///////////////////UPDATE////////////////
function updateRecord(req,res){
    const id= req.params.id;
    Image.findOneAndUpdate({"_id":id},req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                console.log('Güncelleme sırasında bir sorun oluştu!' +data);
            }
            else{
                if (!req.files){
                    data.url=req.body.fileText; //URL olarak girilen resim yolu
                    data.name=req.body.name;
                    console.log(data+'Güncelleme Başarılı' + "ID:"+id);
                    res.redirect('/list');
                    data.save();
                }else
                    data.url=UplaodPath+req.body.fileText; // Upload Olarak gelen resim yolu
                    data.name=req.body.name;
                    console.log(data+'Güncelleme Başarılı' + "ID:"+id);
                    res.redirect('/list');
                    data.save();
                    uploadImage(req,res); //uploadImage Functionu çağrı
            }
        });
}
///////////////////UPLOAD////////////////
function uploadImage(req,res){
        var file = req.files.fileUp;
        var filename = file.name; 
        var url=UplaodPath+filename;
        file.mv('.'+UplaodPath+filename,function(err){
            if (err) {
                console.log(err);
                return ;
            }
            console.log("başarrılı");
            return;
        });  
}
///////////////////DELETE////////////////
function deleteRecord(id,res) {
      
    Image.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
            console.log('Silme işlemi sırasında bir sorun oluştu!' +data);
            
        } else {
            console.log(data+'Kayıt Silindi.' + "ID:"+id);
            res.redirect('/list');
            
        }
    });
}

module.exports = router;
