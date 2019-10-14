import React, { Component } from 'react'
import { Drawer } from './Drawer'

export class AppHeader extends Component {
  constructor() {
    super()

    this.state = {
      menu: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }  

  toggleMenu() {
    if (this.state.menu) {
      this.setState({ menu: false })
    } else {
      this.setState({ menu: true })
    }
  }
  
  render() {
    let drawer = ''

    if (this.state.menu) {
      drawer = <Drawer onDrawerClose={this.toggleMenu}/>
    } else {
      drawer = ''
    }

    return (
      <div className="app-header">
        <div className="app-header__title">Messenger</div>
        <div className="app-header__controls">
            <div className="icon__btn" onClick={this.toggleMenu}>
                <i className="material-icons">menu</i>
            </div>
        </div>
        {drawer}
      </div>
    )
  }
}

export default AppHeader
