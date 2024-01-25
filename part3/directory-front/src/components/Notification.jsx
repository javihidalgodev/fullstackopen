const Notification = ({ notification }) => {
  if(notification === null) {return null}

  const type = notification.type

  const addStyle = {
    color: 'green',
    backgroundColor: 'lightgrey',
    padding: 15,
    border: 2,
    borderStyle: 'solid',
    marginBottom: 15
  }

  const errorStyle = {
    color: 'red',
    backgroundColor: 'lightgrey',
    padding: 15,
    border: 2,
    borderStyle: 'solid',
    marginBottom: 15
  }

  return (
    <div className='notification' style={type === 'error' ? errorStyle : addStyle}>{notification.message}</div>
  )
}

export default Notification