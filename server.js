import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const buildPath = path.join(path.resolve(__dirname, './build'))

app.use(express.static(buildPath, { index: false }))

app.get(`/isAlive|/isReady`, (req, res) => {
    res.send('OK')
})

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(3000, () => { console.log('Listening on port 3000')})