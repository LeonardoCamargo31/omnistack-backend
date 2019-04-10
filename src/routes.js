const express = require('express')
const multer=require('multer')
const multerConfig=require('./config/multer')

const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')
const routes = express.Router()



routes.post('/boxes', BoxController.store)
routes.get('/boxes/:id', BoxController.show)

//single(nomedocampo) para um unico arquivo, para muitos seria .array(),
routes.post('/boxes/:id/files',multer(multerConfig).single('file'), FileController.store)

//exportar alguma informação, no caso exportando a variavel routes
module.exports = routes