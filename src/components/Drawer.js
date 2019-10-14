import React, { Component } from 'react'
import { Link } from "react-router-dom"

export class Drawer extends Component {
  constructor() {
    super()

    this.state = {
        username: 'Asset Sultanov',
        links: [
            { title: 'Main', icon: 'home', path: '/', func: this.closeDrawer(null, true) },
            { title: 'Account', icon: 'account_circle', path: '/account', func: this.closeDrawer(null, true) },
            { title: 'Logout', icon: 'exit_to_app', path: '/auth', func: this.logout }
        ]
    }

    this.logout = this.logout.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }

  logout() {
    this.closeDrawer(null, true)
  }

  /** Close Drawer
   * @param {Object} e Event 
   * @param {Boolean} isLink
   */
  closeDrawer(e, isLink) {
    if (!isLink) {
        e.preventDefault()
        if (e.target === e.currentTarget) {
            this.props.onDrawerClose()
        }
    } else {
        this.props.onDrawerClose()
    }
  }

  render() {
    return (
      <div className="drawer__container" onClick={this.closeDrawer}>
          <div className="drawer">
            <div className="drawer__title">
                <i className="material-icons">account_circle</i>
                {this.state.username}
            </div>
            <div className="drawer__list">
                {this.state.links.map(link => {
                    return <Link className="drawer__list-item"
                            onClick={link.func} 
                            to={link.path}>
                        <i className="material-icons">{link.icon}</i>
                        {link.title}
                    </Link>
                })}
            </div>
        </div>
      </div>
    )
  }
}

export default Drawer
