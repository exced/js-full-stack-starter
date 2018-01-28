import { connect } from 'react-redux'
import { signinRequest } from '../Actions/Auth'
import SigninPage from '../Components/SigninPage'

const mapStateToProps = (state, ownProps) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  statusText: state.auth.statusText
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (username, password) => dispatch(signinRequest(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage)
