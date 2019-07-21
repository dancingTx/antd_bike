import React, { Component } from 'react'
import { Card, Form, Input, Button, Radio, InputNumber, Select, Switch, Icon, DatePicker, TimePicker, Upload, Checkbox } from 'antd'
import moment from 'moment'
import './index.less'
const { Item } = Form
const { Group } = Radio
const { Password, TextArea } = Input
const { Option } = Select
class RegisterForm extends Component {
    state={
        loading: false
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const { loading } = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const singleOption = [
            { name: '有为青年', code: 'ywqn' },
            { name: '咸鱼一条', code: 'xyyt' },
            { name: '俊男靓女', code: 'jnln' },
            { name: '街头霸王', code: 'jtbw' },
            { name: '青年才俊', code: 'qncj' },
        ]
        const manyOptions = [
            { name: '篮球', code: 'basketball' },
            { name: '足球', code: 'footerball' },
            { name: '棒球', code: 'baseball' },
            { name: '游泳', code: 'swim' },
            { name: '音乐', code: 'sing' },
            { name: '舞蹈', code: 'dance' }
        ]
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Card title='注册表单'>
                    <Form {...formItemLayout}>
                        <Item label="用户名">
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        type: 'text',
                                        message: 'The input is not valid Username!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ],
                            })(<Input placeholder='请输入用户名' />)}
                        </Item>
                        <Item label="密码">
                            {getFieldDecorator('password', {
                                initialValue: '123',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        min: 5,
                                        max: 12,
                                        message: 'the password charactar is between 5 and 12'
                                    },
                                ],
                            })(<Password placeholder='请输入密码' />)}
                        </Item>
                        <Item label="性别">
                            {getFieldDecorator('gender', {
                                initialValue: 'male',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your gender!',
                                    }
                                ],
                            })(<Group>
                                <Radio value='male'>男</Radio>
                                <Radio value='female'>女</Radio>
                            </Group>)}
                        </Item>
                        <Item label="年龄">
                            {getFieldDecorator('age', {
                                initialValue: 0,
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your age!',
                                    }
                                ],
                            })(<InputNumber min={0} max={200} />)}
                        </Item>
                        <Item label="当前状态">
                            {getFieldDecorator('curr_status', {
                                initialValue: 'ywqn',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your currentStatus!',
                                    }
                                ],
                            })(<Select>
                                {
                                    singleOption.map(({code,name}) => (
                                        <Option value={code} key={code}>{name}</Option>
                                    ))
                                }
                            </Select>)}
                        </Item>
                        <Item label="兴趣爱好">
                            {getFieldDecorator('hobbies', {
                                initialValue: ['dance', 'swim'],
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your hobbies!',
                                    }
                                ],
                            })(<Select
                                mode="tags"
                                placeholder="Please select hobby"
                            >
                                {
                                    manyOptions.map(({code,name}) => (
                                        <Option value={code} key={code}>{name}</Option>
                                    ))
                                }
                            </Select>)}
                        </Item>
                        <Item label="是否已婚">
                            {getFieldDecorator('if_marry', {
                                initialValue: true,
                                valuePropName: 'checked',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your if_marry!',
                                    }
                                ],
                            })(<Switch
                                checkedChildren={<Icon type="check" />}
                                unCheckedChildren={<Icon type="close" />}
                            />)}
                        </Item>
                        <Item label="出生日期">
                            {getFieldDecorator('birth', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your birth!',
                                    }
                                ],
                            })(<DatePicker />)}
                        </Item>        
                        <Item label="联系地址">
                            {getFieldDecorator('address', {
                                rules: [],
                            })(<TextArea 
                                placeholder="Please input your address"
                                autosize={{ minRows: 2, maxRows: 6 }} />)}
                        </Item>
                        <Item label="早期时间">
                            {getFieldDecorator('moning', {
                                initialValue: moment('00:00:00', 'HH:mm:ss'),
                                rules: [],
                            })(<TimePicker/>)}
                        </Item>
                        <Item label="用户头像">
                            {getFieldDecorator('avatar', {
                                rules: [],
                            })(<Upload
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="#"
                            >
                                {uploadButton}
                            </Upload>)}
                        </Item>
                        <Item style={{ marginLeft: 400 }}>
                                {getFieldDecorator('plan', {
                                    initialValue: true,
                                    valuePropName: 'checked',
                                    rules: [],
                                })(<Checkbox>我已阅读过<a href='http://www.cn.bing.com'>用户协议</a></Checkbox>)}
                            </Item>
                        <Item style={{ marginLeft: 440 }}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create({ name: 'register' })(RegisterForm)