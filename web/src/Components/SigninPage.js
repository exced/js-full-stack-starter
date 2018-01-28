import React from 'react'
import PropTypes from 'prop-types'
import SigninForm from '../Components/SigninForm'

const styles = {
  form: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-160px 0 0 -160px',
    width: 360,
    height: 300,
    padding: 36,
    boxShadow: '0 0 100px rgba(0,0,0,.08)',
    borderRadius: 4,
    textAlign: 'center',
  }
}

const SigninPage = ({ onSubmit, loading, error }) => (
  <div style={styles.form}>
    <SigninForm loading={loading} error={error} onSubmit={e => onSubmit(e.username, e.password)} />
  </div>
)

SigninPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
}

export default SigninPage
