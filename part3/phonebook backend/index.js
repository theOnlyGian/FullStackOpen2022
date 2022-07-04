require('dotenv').config()
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/Person')
const app = express()
const PORT = process.env.PORT


app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/phones', (req, res)=>{
    Person.find({}).then((people)=>res.json(people))
})

app.get('/api/info', (req, res) => {
    const date = new Date()
    Person.find({}).then((people)=>{
        console.log(people)
        const nPeople = Object.keys(people).length
        res.send(`
        <p>Phonebook has info for ${nPeople} people<p>
        <p>${date.toString()}<p>`)
    })
})

app.get('/api/phones/:id', (req, res)=>{
    const id = req.params.id
    Person.findById(id)
    .then((person) =>{
        if(person){
            res.json(person)
        }
        if(!person){
            res.status(404).end()
        }
    })
    .catch((error)=> next(error))
})

app.delete('/api/phones/:id', (req, res, next)=>{
    const id = req.params.id
    console.log(id)
    Person.findByIdAndRemove(id) 
    .then(() => res.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/phones', (req, res)=>{
    const person = req.body
    if (person.name === undefined || person.number === undefined) {
         return res.status(400).json({
             error: 'content missing'
         })
     }

    const id = Math.floor(Math.random() * 1000)
    const personAdded = new Person({
        name:person.name,
        number:person.number,
        id:id
    })
    
    personAdded.save()
    .then((person)=>res.json(person))
    .catch(error => next(error))
})

app.put('/api/phones/:id', (req, res)=>{
    const body = req.body
    const id = req.params.id
    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(id, person, {new: true}).then((updatedNote=> res.json(updatedNote)))
})

app.listen(PORT, ()=>{
    console.log("Server running in " + PORT)
})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)
