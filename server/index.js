require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const connectDB = require('./config')
const { getAllDocuments, getDocsByUser, createNewDocument, getDocument } = require('./controllers')

const PORT = process.env.PORT || 3001

// Connect to MongoDB
connectDB()

app.use(cors())
app.use(express.json())

app.get('^/$', getAllDocuments)

app.get('/:username', getDocsByUser)

app.get('/doc/:doc_id', getDocument)

app.post('/', createNewDocument)



mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB')
    app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
})