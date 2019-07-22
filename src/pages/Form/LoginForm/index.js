import React, { Component } from 'react'
import './index.less'
import { Card, Form, Input, Icon, Button, Checkbox, message } from 'antd';
const { Item } = Form
class LoginForm extends Component {
    handleSubmit = () => {
        const { validateFields } = this.props.form
        validateFields((err, { username, password }) => {
            if (!err) {
                message.success(`用户名为:${username}`)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title='登录行内表单' className='card'>
                    <Form layout='inline'>
                        <Item>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                style={{ width: 200 }}
                            />
                        </Item>
                        <Item>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Password"
                                style={{ width: 200 }}
                            />
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Item>
                    </Form>
                </Card>
                <Card title='登录垂直表单' className='card'>
                    <Form className='login-form'>
                        <Item>
                            {
                                getFieldDecorator('username', {
                                    initialValue: 'admin',
                                    rules: [
                                        { required: true, message: 'please input your username' },
                                        { min: 5, max: 12, message: '用户名长度应为5~12位' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('password', {
                                    initialValue: 'admin',
                                    rules: [
                                        { required: true, message: 'please input your password' },
                                        { min: 5, max: 12, message: '密码长度应为5~12位' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('remember', {
                                    initialValue: true,
                                    valuePropName: 'checked'
                                })(<Checkbox>Remember me</Checkbox>)
                            }
                            <a className="login-form-forgot" href="http://cn.bing.com">Forgot password</a>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                onClick={this.handleSubmit}>
                                登录
                            </Button>
                            Or <a href="http://cn.bing.com">注册</a>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create({ name: 'login' })(LoginForm)