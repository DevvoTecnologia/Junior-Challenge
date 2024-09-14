import express from 'express'
import { routes } from './routes'
import { typeOrm } from './database/typeorm/data-source'

const app = express()

app.use(express.json())
app.use(routes)

typeOrm
  .initialize()
  .then(() => {
    console.log(
      "Conexão com o banco de dados estabelecida com sucesso!"
    )
  })
  .catch((error) => {
    console.log(
      `Erro ao estabelecer a conexão com o banco de dados: ${error}`
    )
    process.exit(1)
  })

app.listen(3333, () => {
  console.log("Server is running!")
})