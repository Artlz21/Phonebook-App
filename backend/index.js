// This program is a continuation of the phone book app that we have worked
// on in the past but now we are completing the fullstack connection and deploying
// the app to render.
// - Part 1 Phonebook backend 10
//      W
// - Part 2 Phonebook backend 11
//      W
// - Part 3 Phonebook backend 12
//      W
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let data = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
      }
    ]

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/data/persons', (req, res) => {
    res.json(data)
})

app.get('/info', (req, res) => {
    let numberOfPeople = data.length
    let date = new Date()

    res.send(`
        <h1>Phonebook has info for ${numberOfPeople} people</h1> 
        <br>
        <p>${date} </p>
        `)
})

app.get('/data/persons/:id', (req, res) => {
    const id = req.params.id
    const person = data.find(person => person.id === id)

    if(person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/data/persons/:id', (req, res) => {
    const id = req.params.id
    data = data.filter(person => person.id !== id)
    res.status(204).end()
})

const generateId = () => Math.floor(Math.random() * 1000)

app.post('/data/persons', (req,res) => {
    const body = req.body
    let newId = generateId()

    if(!body.name || !body.number || data.some(person => person.name === body.name)) {
        return res.status(400).json({error: 'Duplicate or no name and number given...'})
    }

    while(data.some(person => Number(person.id) === newId)) {
        newId = generateId()
    }

    const person = {
        name: body.name,
        number: body.number,
        id: String(newId)
    }

    data.push(person)
    console.log(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})