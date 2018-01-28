import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

const SigninForm = ({ form, onSubmit, loading, error }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {form.getFieldDecorator('username', {
          rules: [{
            required: true, message: "Username required",
          }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
      </FormItem>
      <FormItem>
        {form.getFieldDecorator('password', {
          rules: [{
            required: true, message: 'Password required',
          }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
      </FormItem>
      <FormItem>
        <Button type={error ? "danger" : "primary"} htmlType="submit" icon="login" loading={loading}>Signin</Button>
      </FormItem>
      <FormItem>
        <Link to="/signup">Or signup</Link>
      </FormItem>
    </Form>
  )
}

SigninForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

export default Form.create()(SigninForm)
