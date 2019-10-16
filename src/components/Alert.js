import React from 'react'

const Alert = ({ message, messageStatus, onDeleteAlert }) => {
    return (
      <div className={"alert " + messageStatus}
        onClick={onDeleteAlert}>
          {message}
      </div>
    )
}

export default Alert
