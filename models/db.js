const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://delphizone:GQyMjVYeCee7tcuS@cluster0.bv8rq.gcp.mongodb.net/sa-db",{
                    useNewUrlParser:true,
                    useUnifiedTopology:true
                    //user: process.env.MONGO_USER,
                    //pass: process.env.MONGO_PASSWORD
                },
                (err)=>{
                    if (!err){console.log('MongoDB Bağlantı Yapıldı.');}
                    else {console.log('MongoDB Bağlantı Başarısız:'+err);}
                });
require('./images.model');