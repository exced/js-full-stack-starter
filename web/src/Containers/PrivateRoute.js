import { connect } from 'react-redux'
import PrivateRoute from '../Components/PrivateRoute'

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  roles: state.auth.roles,
})

export default connect(mapStateToProps)(PrivateRoute)
