import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { addUserMutation, updateUserMutation, removeUserMutation } from '../Mutations/User'
import { usersQuery } from '../Queries/User'
import { servicesQuery } from '../Queries/Service'
import { WithLoading } from '../Components/Loading'
import Users from '../Components/Users'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

const WithData = compose(
    servicesQuery,
    WithLoading,
    usersQuery,
    addUserMutation,
    updateUserMutation,
    removeUserMutation,
    WithLoading
)(Users)

export default connect(mapStateToProps, mapDispatchToProps)(WithData)
