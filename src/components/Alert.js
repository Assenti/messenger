import React from 'react'

const Alert = ({ message, messageStatus, deleteAlert }) => {
    return (
      <div className={"alert " + messageStatus}
        onClick={deleteAlert}>
          {message}
      </div>
    )
}

export default Alert
