import React, { Component } from 'react'

export class AppHeader extends Component {
  
  render() {
    return (
      <div className="app-header">
        <div className="app-header__title">Messager</div>
        <div className="app-header__controls">
            <div className="icon__btn">
                <i className="material-icons">menu</i>
            </div>
        </div>
      </div>
    )
  }
}

export default AppHeader
