const multer = require('multer')
const path = require('path')
const crypto= require('crypto')

//exportar um objeto
module.exports = {
    //destino do meus arquivos
    dest: path.resolve(__dirname, '..', '..', 'tmp'),//__dirname retorna onde o multer esta ou seja config, voltando pastas com ..
    storage: multer.diskStorage({//ou seja quero armazer em disco, poderia armazenar em banco, em serviços clound, etc
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'tmp'))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16,(err,hash)=>{//quero gerar 16 bytes de caracteres aleatórios
                if(err){//caso tenha dado erro, retono o erro no cb
                    callback(err)
                }
                
                file.key=`${hash.toString('hex')}-${file.originalname}`
                callback(null, file.key )//null para o erro
            })
        }
    })
}