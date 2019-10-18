import React from 'react'

const Preloader = ({ innerOnly }) => {
    return(
        <div className={innerOnly ? '' : 'preloader-container'}>
            <div className="preloader" title="Gif author: https://dribbble.com/bowdenmedia"></div>
        </div>
    )
}

export default Preloader