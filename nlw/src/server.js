//Antes de iniciar o trabalho nesse arquivo foram executados os passo:

//npm initi -y
//para instalar o node no projeto atual

//npm install express
//para instalar o pacote express que vai permitir as configurações de servidor.

const express = require("express")
const server = express()

//pegar banco de dados
const db = require("./database/db.js")

//Torna o conteúdo da pasta public aberto.
//No navegar seu eu informar o url .../assets, será na verdade ...public/assets
server.use(express.static("public"))

//Habilitar uso do req.body
server.use(express.urlencoded({extended: true}))


//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    nocache: true
})


//Configurar o caminho da aplicação
server.get("/", (req, res) => {
    // res.sendFile(__dirname + "/views/index.html")
    //Após instalar nunjucks:
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    // res.sendFile(__dirname + "/views/create-point.html")
    //Após instalar nunjucks:
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.query => só funciona via GET
    //post usa req.body

    //inserir dados
    const query = `
        insert into places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        )
        values(?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.selectedItems,
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso.")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
})


server.get( "/search-results", (req, res) => {

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }



    //consultar
    db.all(`select * from places where city like '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão os registros.")
        console.log(rows)

        return res.render("search-results.html", {places: rows, total: total})
    })

})

server.listen(3000)