import React, { Component } from 'react'
import { Card, Form, Input, Button, Radio, InputNumber, Select, Switch, Icon, DatePicker, TimePicker, Upload, Checkbox } from 'antd'
import moment from 'moment'
import './index.less'
const { Item } = Form
const { Group } = Radio
const { Password, TextArea } = Input
const { Option } = Select
class RegisterForm extends Component {
    state = {
        loading: false
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (!err) {
                values.birth = values.birth._i
                console.log(values)
            }
        });
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
        const ItemLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { offset: 8 }
            }
        }
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
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Item label="用户名">
                            {getFieldDecorator('username', {
                                initialValue: 'admin',
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ],
                            })(<Input placeholder='请输入用户名' />)}
                        </Item>
                        <Item label="密码">
                            {getFieldDecorator('password', {
                                initialValue: '123456',
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
                                    singleOption.map(({ code, name }) => (
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
                                    manyOptions.map(({ code, name }) => (
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
                                initialValue: moment(Date.now()),
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your birth!',
                                    }
                                ],
                            })(<DatePicker showTime format='YYYY/MM/DD HH:mm:ss' />)}
                        </Item>
                        <Item label="联系地址">
                            {getFieldDecorator('address', {
                                initialValue: '北京市海淀区',
                                rules: [],
                            })(<TextArea
                                placeholder="Please input your address"
                                autosize={{ minRows: 2, maxRows: 6 }} />)}
                        </Item>
                        <Item label="早起时间">
                            {getFieldDecorator('moning', {
                                initialValue: moment(Date.now()),
                                rules: [],
                            })(<TimePicker format='HH:mm:ss' />)}
                        </Item>
                        <Item label="用户头像">
                            {getFieldDecorator('avatar', {
                                rules: [],
                            })(<Upload
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                onChange={this.handleChange}
                            >
                                {this.state.imageUrl ? <img alt='' style={{ width: 400 }} src={this.state.imageUrl} /> : uploadButton}
                            </Upload>)}
                        </Item>
                        <Item {...ItemLayout}>
                            {getFieldDecorator('plan', {
                                initialValue: true,
                                valuePropName: 'checked',
                                rules: [],
                            })(<Checkbox>我已阅读过<a href='http://www.cn.bing.com'>用户协议</a></Checkbox>)}
                        </Item>
                        <Item {...ItemLayout}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create({ name: 'register' })(RegisterForm)