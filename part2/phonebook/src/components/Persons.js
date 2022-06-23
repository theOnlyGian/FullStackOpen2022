import personsService from '../services/Service'

const Person = ({ person, setMessage }) => {
    const handleDelete = () => {
        if (window.confirm('Do you really want to delete ' + person.name + '?')) {
            personsService.delete(person.id).catch(()=>setMessage({
                success:false,
                content:`${person.name} is already deleted in the server.`
            }))
            setTimeout(() => setMessage({ success: null, content: '' }), 3000)
        }
    }

    return (
        <>
            <li>{person.name} - {person.number}</li>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}
const Persons = ({ personsToShow, setMessage }) => {
    return (
        <div>
            {personsToShow.map((person) => {
                return (
                    <Person key={person.id.toString()} person={person} setMessage={setMessage}/>
                )
            })}
        </div>
    )
}

export default Persons