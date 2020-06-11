//importar dependência sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar objeto q ira fazer operações no banco de dabos
const db = new sqlite3.Database("./src/database/database.db")

//utilizar o objeto de db para operações
// db.serialize( () => {
    //criar tabela
    // db.run(`
    //     create table if not exists places(
    //         id integer primary key autoincrement,
    //         image text,
    //         name text,
    //         address text,
    //         address2 text,
    //         state text,
    //         city text,
    //         items text
    //     );
    // `)

    // //inserir dados
    // const query = `
    //     insert into places(
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     )
    //     values(?, ?, ?, ?, ?, ?, ?)
    // `
    // const values = [
    //     "http://localhost:3000/assets/results-eletronicos.jpg",
    //     "Colectoria",
    //     "Guilherme Gemballa, Jardim América",
    //     "Num. 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]

    // function afterInsertData(err){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com sucesso.")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

    // //consultar
    // db.all(`select * from places`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão os registros.")
    //     console.log(rows)
    // })

    //deletar
    // db.run(`delete from places where id = ?`, [4]), function(err) {
    db.run(`delete from places`), function(err) {
        if(err){
            return console.log(err)
        }

        console.log("Registro deletado.")
    }
// })

module.exports = db