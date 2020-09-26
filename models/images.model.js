const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
        url: String,
        name: String
      },
      { timestamps: true }
    );
    imageSchema.method("toJSON",function(){
        const {__v,_id, ...object}= this.toObject();
        object.id= _id;
        return object;
    });
mongoose.model('Image',imageSchema);