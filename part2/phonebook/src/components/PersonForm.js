const PersonForm = ({ addPhone, newName, handlePersonInput, newNumber, handleNumberInput }) => {
    return (
        <div>
            <form onSubmit={addPhone}>
                <div>
                    name: <input value={newName} onChange={handlePersonInput} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberInput} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm