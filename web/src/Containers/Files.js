import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose } from 'react-apollo'
import { WithLoading } from '../Components/Loading'
import { createFolderMutation, updateFolderMutation, removeFolderMutation } from '../Mutations/Folder'
import { updateFileMutation, removeFileMutation } from '../Mutations/File'
import { filesQuery } from '../Queries/File'
import { toMatchFileManager } from '../Transforms/File'
import Files from '../Components/Files'

const mapStateToProps = (state, ownProps) => ({
    token: state.auth.token,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    push: (params) => dispatch(push(params)),
})

const DataResolver = Wrapped => ({ files, ...props }) =>
    <Wrapped {...props} root={files.find(f => !f.parent)} files={toMatchFileManager(files)} />

const WithData = compose(
    filesQuery,
    createFolderMutation,
    updateFolderMutation,
    removeFolderMutation,
    updateFileMutation,
    removeFileMutation,
    WithLoading,
    DataResolver,
)(Files)

export default connect(mapStateToProps, mapDispatchToProps)(WithData)
