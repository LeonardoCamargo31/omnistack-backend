const mongoose = require('mongoose')


const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,//isso faz ele criar o createAt e updateAt
        toObject: { virtuals: true },//toda vez que o File, foi convertido seja em objeto ou json, para ele fazer o carregamento desse nosso virtual automaticamente
        toJSON: { virtuals: true }
    });

//um atributo virtual, ele não existe no banco de dado, só existe aqui no nosso backend
File.virtual('url').get(function () {
    return `http://localhost:3000/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File)