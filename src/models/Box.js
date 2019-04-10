const mongoose = require('mongoose')


const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId, ref: "File"//ela vai armazenar os id's de file que pertecem a esse box
    }]
},
    {
        timestamps: true//isso faz ele criar o createAt e updateAt
    });


module.exports = mongoose.model('Box', Box)