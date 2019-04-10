const File = require('../models/File')
const Box = require('../models/Box')

class FileController {
    async store(req, resp) {
        const box = await Box.findById(req.params.id)

        const file = await File.create({
            title: req.file.originalname,//nome original do arquivo
            path: req.file.key//caminho que geramos no multerConfig
        })

        box.files.push(file)//incluindo ao box esse novo arquivo
        await box.save()

        //sockets pego todos usuarios conectados na minha aplicação com aquele id
        req.io.sockets.in(box._id).emit('file',file)//vou enviar o file
        //apartir disso se um usuario criar um arquivo, outros usuarios conectados na mesma box, tb recebem o arquivo

        return resp.json(file)
    }
}

module.exports = new FileController()//estou retornando uma instancia da minha classe