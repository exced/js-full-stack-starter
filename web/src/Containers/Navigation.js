import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Navigation from '../Components/Navigation'

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.auth.isLoggedIn,
  roles: state.auth.roles,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
