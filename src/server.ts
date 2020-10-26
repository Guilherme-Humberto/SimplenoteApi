import app from './index'
const port = process.env.PORT || 3002

app.express.listen(port, () => 
console.log(`Conectado ao servidor ${port}`))