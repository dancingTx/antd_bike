import React, { Component } from 'react'
import { Form, Select, Button } from 'antd'
const { Item } = Form
const { Option } = Select
class FilterForm extends Component {
    handleSubmit = () => {
        const { validateFields } = this.props.form
        validateFields((err, data) => {
            if (!err) {
                console.log(data)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form layout='inline' onSubmit={this.handleSubmit}>
                <Item label='城市'>
                    {
                        getFieldDecorator('city')(
                            <Select style={{ width: 150 }} placeholder='全部'>
                                <Option value="all">全部</Option>
                                <Option value="beijing">北京</Option>
                                <Option value="shanghai">上海</Option>
                                <Option value="tianjin">天津</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item label='用车模式'>
                    {
                        getFieldDecorator('car_mode')(
                            <Select style={{ width: 150 }} placeholder='全部'>
                                <Option value="all">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item label='营运模式'>
                    {
                        getFieldDecorator('opt_mode')(
                            <Select style={{ width: 150 }} placeholder='全部'>
                                <Option value="all">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item label='加盟商授权状态'>
                    {
                        getFieldDecorator('auth_status')(
                            <Select style={{ width: 150 }} placeholder='全部'>
                                <Option value="all">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    <Button type='primary' htmlType='submit'>查询</Button>
                    <Button type='default'>重置</Button>
                </Item>
            </Form>
        )
    }
}

export default Form.create({ name: 'filter_form' })(FilterForm)