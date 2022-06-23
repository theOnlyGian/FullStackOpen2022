
const Notification = ({ message }) => {
    if (message.success === null) {
        return
    }
    if (message.success === true) {
        return (
            <div className='message success'>
                {message.content}
            </div>
        )
    }
    if (message.success == false){
        return (
            <div className='message unsuccess'>
                {message.content}
            </div>
        )
    }
    
}
export default Notification