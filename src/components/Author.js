import React from 'react'
import githubLogo from '../img/github.svg'
import linkedinLogo from '../img/linkedin.svg'

const Author = () => {
    const github = 'https://github.com/Assenti'
    const linkedin = 'https://www.linkedin.com/in/asset-sultanov-developer/'

    return (
        <div className="author">
            <a className="author__link"
                title="Visit my Github Page"
                href={github}
                onClick={e => {
                    e.preventDefault()
                    window.open(github, '_blank')
                }}>
                <img src={githubLogo} alt="GitHub"/>
            </a>
            <a className="author__link"
                title="Visit my LinkedIn Page"
                href={linkedin}
                onClick={e => {
                    e.preventDefault()
                    window.open(linkedin, '_blank')
                }}>
                <img src={linkedinLogo} alt="LinkedIn"/>
            </a>
            @AssetSultanov, 2019
        </div>
    )
}

export default Author