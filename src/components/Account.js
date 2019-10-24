import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import avatar from '../img/person.png'

const Account = ({ onClose }) => {
    const user = useSelector(state => state.auth.user)
    const [status] = useState(user.status)

    const phoneMask = (phone) => {
        return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`
    }

    const userData = [
        { title: 'First name', value: user.firstname },
        { title: 'Last name', value: user.lastname },
        { title: 'Email', value: user.email },
        { title: 'Phone', value: phoneMask(user.phone) }
    ]

    // const updateStatus = () => {
    //     setStatus()
    // }

    return (
        <div className="account animated slideInRight faster">
            <div className="flex justify-end pa-10">
                <button className="btn secondary" onClick={() => onClose()}>Close</button>
            </div>
            <div className="account__content">
                <div className="account__avatar">
                    <img src={avatar} 
                        alt="avatar" 
                        title="Author: Flaticon https://www.flaticon.com/authors/monkik"/>
                </div>
                <div className="account__status">{status}</div>
                <div className="account__details">{userData.map((item, index) => {
                    return (
                        <div key={index}>
                            <small>{item.title}:</small>
                            <strong>{item.value}</strong>
                        </div>
                        )
                    })
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Account