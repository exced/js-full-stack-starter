import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import App from '../Components/App'

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
