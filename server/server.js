import express from 'express'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(cors())

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers, *, Access-Control-Allow-Origin',
    'Origin, X-Requested-with, Content_Type,Accept,Authorization',
    'http://localhost:5173'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist/index.html'))
)

app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message,
  })
})

const port = 5013

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`)
})
