import React from 'react'
import PropTypes from 'prop-types'
import { Menu as AMenu, Icon } from 'antd'

const iconStyle = {
  fontSize: 20,
}

const titleStyle = {
  fontSize: 14,
}

const Menu = ({ username, push, logout }) => {

  const onClick = ({ key }) => {
    switch (key) {
      case "home":
        push('/')
        break
      case "files":
        push('/files')
        break
      case "logout":
        logout()
        break
      default:
        return
    }
  }

  return (
    <AMenu theme="dark" selectable={false} onClick={onClick} mode="horizontal">
      <AMenu.Item key="home">
        <Icon type="home" style={iconStyle} />
        <span style={titleStyle}>Home</span>
      </AMenu.Item>
      <AMenu.Item key="files">
        <Icon type="folder" style={iconStyle} />
        <span style={titleStyle}>Files</span>
      </AMenu.Item>
      <AMenu.Item key="logout">
        <Icon type="logout" style={{ ...iconStyle, color: 'red' }} />
        <span style={{ ...titleStyle, color: 'red' }}>Logout ({username})</span>
      </AMenu.Item>
    </AMenu>
  )
}


Menu.propTypes = {
  username: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default Menu

