const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')//importando a variavel routes
const path = require('path')
const cors = require('cors')


const app = express()
app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)//já invoco com ()


io.on('connection', socket => {
    console.log('ok')
    //não requeremos que quando user1 crie um arquivo na box 1 , o user2 na box 2 receba esse arquivo
    //então vamos criar salas, room, para cada box
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-e9bq7.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
})

//criar um middleware
app.use((req, resp, next) => {
    //definindo uma nova variavel global para a aplicação, definindo uma variavel dentro de req
    //então em todas nossas rotas, vai ter acesso a informação io, dentro do req
    req.io = io
    return next()//para sair do middleware
})


//use quando quero cadastrar um modulo dentro do meu express
app.use(express.json())//para entender as requisições em formato json
app.use(express.urlencoded({ extended: true }))//para entender envio de arquivo

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))//toda vez que acessar a rota files, buscamos os arquivos lá na pasta tmp

app.use(routes)

server.listen(process.env.PORT || 3000)//assim minha aplicação já esta ouvindo requisições com protocolo http e com protocolo socket.io