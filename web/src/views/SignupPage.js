/**
 *
 * @flow
 */

import * as React from 'react';
import { Mutation } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import { Form, Input, Button, Icon } from 'antd';

import { signup } from '../mutations/user';
import { setToken } from '../services/storage';

const FormItem = Form.Item;

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
	},
};

const SignupForm = Form.create()(({ form, onSubmit, loading = false, error = false }) => {
	const handleSubmit = e => {
		e.preventDefault();
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				onSubmit(values);
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormItem>
				{form.getFieldDecorator('email', {
					rules: [
						{
							required: true,
							message: 'Email required',
						},
					],
				})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
			</FormItem>
			<FormItem>
				{form.getFieldDecorator('password', {
					rules: [
						{
							required: true,
							message: 'Password required',
						},
					],
				})(
					<Input
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						placeholder="Password"
					/>
				)}
			</FormItem>
			{error && <span>Bad credentials</span>}
			<FormItem>
				<Button type={error ? 'danger' : 'primary'} htmlType="submit" icon="signup" loading={loading}>
					Signup
				</Button>
			</FormItem>
			<Link to="/login">Already have an account ?</Link>
		</Form>
	);
});

type Props = {
	history: Object,
};

class SignupPage extends React.Component<Props> {
	render() {
		return (
			<div style={styles.form}>
				<Mutation
					mutation={signup}
					onCompleted={({ signup }) => {
						setToken(signup.token);
						this.props.history.push('/');
					}}
				>
					{(signup, { loading, error }) => (
						<SignupForm
							loading={loading}
							error={error}
							onSubmit={({ email, password }) => signup({ variables: { email, password } })}
						/>
					)}
				</Mutation>
			</div>
		);
	}
}

export default withRouter(SignupPage);
