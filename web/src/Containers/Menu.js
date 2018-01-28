import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { logout } from '../Actions/Auth'
import Menu from '../Components/Menu'

const mapStateToProps = (state, ownProps) => ({
  username: state.auth.username,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  push: (params) => dispatch(push(params)),
  logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
