const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://gianluca:${password}@cluster0.tmpmr.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    "name": String,
    "number": String
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

mongoose.connect(url)
    .then((result) => {
        console.log('Connected')
        const person = new Person({
            name: name,
            number: number,
        })
        return person.save()
    })
    .then(() => {
        console.log('Person saved')
        Person
            .find({})
            .then((people) => {
                console.log('Phonebook:')
                people.forEach(
                    (person) => {
                        console.log(person.name + ' ' + person.number)
                    })
                return mongoose.connection.close()
            })

    })
    .catch((error) => console.log(error))
