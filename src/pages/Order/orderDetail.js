import React, { Component } from 'react'
import { Card, Divider } from 'antd'
import './orderDetail.less'
import { orderDetail } from '../../api/order'
import Utils from '../../utils/utils'
const { m2Km } = Utils
class OrderDetail extends Component {
    state = {
        result: {}
    }
    componentWillMount(){
        const { order_id } = this.props.match.params
        if(order_id) {
            this.getDetailInfo(order_id)
        }
    }
    getDetailInfo = async (order_id) =>{
        const {result} = await orderDetail(order_id)
        this.setState({ result })
    }
    render() {
        const { result } = this.state
        const orderdDetail = [
            {
                detail_title: '基础信息', detail_form: [
                    { detail_form_title: '用车模式', detail_form_content: result.mode === 1 ? '服务区':'停车点' },
                    { detail_form_title: '订单编号', detail_form_content: result.order_sn },
                    { detail_form_title: '车辆编号', detail_form_content: result.bike_sn },
                    { detail_form_title: '用户姓名', detail_form_content: result.user_name },
                    { detail_form_title: '手机号码', detail_form_content: result.mobile },
                ]
            },
            {
                detail_title: '行驶轨迹', detail_form: [
                    { detail_form_title: '行驶起点', detail_form_content: result.start_location },
                    { detail_form_title: '行驶终点', detail_form_content: result.end_location },
                    { detail_form_title: '行驶里程', detail_form_content: m2Km(result.distance) },
                ]
            },
        ]
        return (
            <div>
                <Card>
                    <div id='orderDetailMap'></div>
                    <div className='detail_items'>
                        {
                            orderdDetail.map((item, index, arr) => (
                                <div key={index}>
                                    <div className='detail_title'>{item.detail_title}</div>
                                    <ul className='detail_form'>
                                        {
                                            item.detail_form.map((list,index) => (
                                                <li key={index}>
                                                    <div className='detail_form_title'>{list.detail_form_title}</div>
                                                    <div className='detail_form_content'>{list.detail_form_content}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    {arr.length - 1 === index ? '' : (<Divider />)}
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </div>
        )
    }
}

export default OrderDetail