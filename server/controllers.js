const Document = require('./model/Document')

const getAllDocuments = async (req, res) => {
    const result = await Document.find()
    res.json(result)
}

const getDocsByUser = async (req, res) => {
    if (!req?.params?.username)
    return res.status(400).json({ "message": "An username is required." })
    
    const username = req.params.username
    const foundDoc = await Document.find({ author: username }).exec()
    if (!foundDoc)
    return res.status(204).json([])
    
    res.json(foundDoc)
}

const getDocument = async (req, res) => {
    if (!req?.params?.doc_id)
        return res.status(400).json({ "message": "An document id is required." })
    const doc_id = req.params.doc_id
    const foundDoc = await Document.findOne({ doc_id }).exec()
    if (!foundDoc) return res.status(204).json([])
    res.status(200).json(foundDoc)
}

const createNewDocument = async (req, res) => {
    if (!req?.body)
        return res.status(404).json({ "message": "Please provide correct data." })

    try {
        const result = await Document.create({
            "doc_id": req.body.doc_id,
            "title": req.body.title,
            "author": req.body.author,
            "content": req.body.content
        })
        res.status(201).json(result)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = { getAllDocuments, getDocsByUser, createNewDocument, getDocument }