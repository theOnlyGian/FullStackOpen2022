const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url)
.then(()=>console.log('Connected to the database'))
.catch((error) => console.log(error))

const personSchema = new mongoose.Schema({
    name:
    {
        type: String,
        minLength: 3,
        required: true
    },
    number: 
    {
        type: String,
        validate: 
        {
            validator: function (v) 
            {
                return /\d{2,}-\d{7,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = new mongoose.model('Person', personSchema)

module.exports = Person