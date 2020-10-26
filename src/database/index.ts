import { connect } from 'mongoose'

export const connetion = connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log("Conectado ao banco de dados"))
.catch((err) => console.log(`Erro ao conectar ao banco de dados ${err}`))