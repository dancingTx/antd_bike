import React, { Component } from 'react'
import { Form, Select, Radio } from 'antd';
const { Option } = Select
const { Item } = Form
const { Group } = Radio
class OpenCityForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <div>
                <Form {...formItemLayout}>
                    <Item label='选择城市'>
                        {
                            getFieldDecorator('city_id',{})(
                                <Select placeholder='全部'>
                                    <Option value='all'>全部</Option>
                                    <Option value='1'>北京市</Option>
                                    <Option value='2'>天津市</Option>
                                    <Option value='3'>上海市</Option>
                                    <Option value='4'>广州市</Option>
                                </Select>
                            )
                        }
                    </Item>
                    <Item label='营运模式'>
                        {
                            getFieldDecorator('opt_mode',{
                                initialValue:'1'
                            })(
                                <Group>
                                    <Radio value='1'>自营</Radio>
                                    <Radio value='2'>加盟</Radio>
                                </Group>
                            )
                        }
                    </Item>
                    <Item label='用车模式'>
                        {
                            getFieldDecorator('car_mode', {
                                initialValue: '1'
                            })(
                                <Group>
                                    <Radio value='1'>指定停车点模式</Radio>
                                    <Radio value='2'>禁停区模式</Radio>
                                </Group>
                            )
                        }
                    </Item>
                </Form>
            </div>
        )
    }
}
export default Form.create({ name: 'open_city_form' })(OpenCityForm)