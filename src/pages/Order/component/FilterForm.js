import React, { Component } from 'react'
import { Form, Select, Button, DatePicker } from 'antd'
const { Item } = Form
const { Option } = Select
const { RangePicker } = DatePicker
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
                <Item>
                    {
                        getFieldDecorator('between_time')(
                            <RangePicker />
                        )
                    }
                </Item>
                <Item label='订单状态'>
                    {
                        getFieldDecorator('order_status')(
                            <Select style={{ width: 200 }} placeholder='全部'>
                                <Option value="all">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">进行中(临时锁车)</Option>
                                <Option value="3">行程结束</Option>
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