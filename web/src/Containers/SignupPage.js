import { connect } from 'react-redux'
import { signupRequest } from '../Actions/Auth'
import SignupPage from '../Components/SignupPage'

const mapStateToProps = (state, ownProps) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  statusText: state.auth.statusText
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (username, password) => dispatch(signupRequest(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
