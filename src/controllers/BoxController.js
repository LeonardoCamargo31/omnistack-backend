const Box = require('../models/Box')

class BoxController {
    async store(req, resp) {
        const title = req.body.title
        const box = await Box.create({ title })
        return resp.json(box)//invés de send, utilizo o json, pois estou retornando um json
    }

    async show(req, resp) {
        const box = await Box.findById(req.params.id).populate({//populate alem do id, vim todas as informações
            path: 'files',
            options: { sort: { createdAt: -1 } }//ordenar pela data de criação, -1 em ordem decrecente
        })
        return resp.json(box)
    }
}

module.exports = new BoxController()//estou retornando uma instancia da minha classe