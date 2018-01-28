import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, Modal, Tooltip } from 'antd'
import FileManager, { Types } from 'react-file-manager'
import PDFViewer from 'mgr-pdf-viewer-react'
import TextEdit from './TextEdit'
import createAPI from '../Services/Api'

const ButtonGroup = Button.Group
const { confirm } = Modal

const images = {
  file: 'https://raw.githubusercontent.com/exced/react-file-manager/master/public/images/file.png',
  folder: 'https://raw.githubusercontent.com/exced/react-file-manager/master/public/images/folder.png',
}

const FileContentPreview = ({ item }) => {

  if (item.mimetype === 'application/pdf') {
    return <PDFViewer document={{
      base64: item.base64
    }} />
  }

  return <h1>File type not supported for preview</h1>
}

export default class Files extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewModal: null,
    }
    this.api = createAPI(props.token)
  }

  onClickPreviewFile = (item) => {
    this.setState({ previewModal: item })
  }

  onChange = (map) => {

  }

  onChangeColumn = () => {

  }

  onAddFolder = (parent) => {
    this.props.onCreateFolder({ title: 'New folder', parent })
  }

  onClickRemoveFolder = (item) => confirm({
    title: "Remove this folder ?",
    content: item.title,
    onOk: () => this.props.onRemoveFolder(item.id),
    onCancel: () => { },
  })

  onClickRemoveFile = (item) => confirm({
    title: "Remove this file ?",
    content: item.title,
    onOk: () => this.props.onRemoveFile(item.id),
    onCancel: () => { },
  })

  onOutsideDrop = (parent, files) => {
    if (files.length <= 3) {
      let data = new FormData()
      data.append('parent', parent)
      for (let i = 0; i < files.length; i++) {
        data.append('files', files[i])
      }
      this.api.upload(data)
        .then(res => {
          // TODO: anti pattern
          this.forceUpdate()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  renderItem = (item, index) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flex: 1 }}>
        <img src={item.type === Types.folder ? images.folder : images.file} alt={item.title} style={{ width: 22, height: 22, float: 'left' }} />
      </div>
      <div style={{ flex: 5 }}>
        <span style={{ width: 150, textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.title}</span>
      </div>
      <div style={{ flex: 1 }}>
        {item.type === Types.folder && <Icon style={{ float: 'right' }} type="right" />}
      </div>
    </div>
  )

  renderPreview = (item, index) => {
    const { root } = this.props
    // folder
    if (item.type === Types.folder) {
      if (item.id === root.id) {
        return (
          <div style={{ textAlign: 'center', margin: 'auto', marginTop: 170, width: 200, height: 200, border: '1px solid', borderRadius: 6, borderColor: '#ccc' }}>
            <img src={images.folder} alt={item.title} style={{ width: 70, height: 70, margin: 'auto', display: 'block', marginTop: 40 }} />
            <span>{item.title}</span>
            <div style={{ marginTop: 10 }}>
              <ButtonGroup>
                <Tooltip title="New folder">
                  <Button onClick={() => this.onClickAddFolder(item.id)} icon="folder-add" />
                </Tooltip>
              </ButtonGroup>
            </div>
          </div>
        )
      }
      return (
        <div style={{ textAlign: 'center', margin: 'auto', marginTop: 170, width: 200, height: 200, border: '1px solid', borderRadius: 6, borderColor: '#ccc' }}>
          <img src={images.folder} alt={item.title} style={{ width: 70, height: 70, margin: 'auto', display: 'block', marginTop: 40 }} />
          <div style={{ marginTop: 10 }} />
          <TextEdit
            placeholder='title'
            onChange={(title) => this.props.onUpdateFolder(item.id, { title, parent: item.parent })}
            initialValue={item.title}
          />
          <div style={{ marginTop: 10 }}>
            <ButtonGroup>
              <Tooltip title="New folder">
                <Button onClick={() => this.onAddFolder(item.id)} icon="folder-add" />
              </Tooltip>
              <Tooltip title="Remove folder">
                <Button onClick={() => this.onClickRemoveFolder(item)} type="danger" icon="delete" />
              </Tooltip>
            </ButtonGroup>
          </div>
        </div>
      )
    }
    // file
    return (
      <div style={{ textAlign: 'center', margin: 'auto', marginTop: 170, width: 200, height: 200, border: '1px solid', borderRadius: 6, borderColor: '#ccc' }}>
        <img src={images.file} alt={item.title} style={{ width: 70, height: 70, margin: 'auto', display: 'block', marginTop: 40 }} />
        <div style={{ marginTop: 10 }} />
        <TextEdit
          placeholder='title'
          onChange={(title) => this.props.onUpdateFile(item.id, { title, parent: item.parent })}
          initialValue={item.title}
        />
        <div style={{ marginTop: 10 }}>
          <ButtonGroup>
            <Tooltip title="Preview">
              <Button onClick={() => this.onClickPreviewFile(item)} icon="eye-o" />
            </Tooltip>
            <Tooltip title="Remove file">
              <Button onClick={() => this.onClickRemoveFile(item)} type="danger" icon="delete" />
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
    )
  }

  render() {

    const { previewModal } = this.state

    const { files, root } = this.props

    const dropzoneConfig = {
      name: 'files',
      inputProps: {
        type: 'file',
        encType: 'multipart/form-data',
        action: '/files',
        method: 'post'
      }
    }

    return (
      <Fragment>
        <Modal
          width="80%"
          title="Preview"
          visible={previewModal !== null}
          onOk={() => this.setState({ previewModal: null })}
          onCancel={() => this.setState({ previewModal: null })}
        >
          {previewModal && <FileContentPreview item={previewModal} />}
        </Modal>
        <FileManager
          map={files}
          onChange={this.onChange}
          onChangeColumn={this.onChangeColumn}
          rootId={root.id}
          onOutsideDrop={this.onOutsideDrop}
          dropzoneConfig={dropzoneConfig}
          renderItem={this.renderItem}
          renderPreview={this.renderPreview}
        />
      </Fragment>
    )
  }
}

Files.propTypes = {
  token: PropTypes.string.isRequired,
  root: PropTypes.object.isRequired,
  files: PropTypes.object.isRequired,
  onCreateFolder: PropTypes.func.isRequired,
  onUpdateFolder: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  onUpdateFile: PropTypes.func.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
}