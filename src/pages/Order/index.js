import React, { Component } from 'react'
import { Card, Table, Button, Modal, Form, message } from 'antd'
import './index.less'
import FilterForm from './component/FilterForm'
import Utils from '../../utils/utils'
import { orderList, orderFinish } from '../../api/order'

const { pagination } = Utils
const { Item } = Form

class Order extends Component {
    state = {
        list: [],
        selectRowItem:{}
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestData()
    }
    requestData = async () => {
        const { page } = this.params
        const { result } = await orderList(page)
        let { list } = result
        list = list.map((item, index) => {
            item.key = index
            switch (item.status) {
                case 1:
                    item.status = '进行中'
                    break;
                case 2:
                    item.status = '进行中(临时锁车)'
                    break;
                default:
                    item.status = '行程结束'
                    break;
            }
            return item
        })
        this.setState({
            list,
            pagination: pagination(result, current => {
                this.params.page = current
                this.requestData()
            })
        })
    }
    handleFinishOrder = ()=>{
        this.setState({ isShowFinishOrder: true })
    }
    handleOrderDetail = () => {
        this.setState({ isShowOrder: true })
    }
    handleCancel = () => {
        this.setState({ isShowOrder: false, isShowFinishOrder: false })
    }
    handleSubmit = async () => {
        const {result} = await orderFinish()
        if(result) {
            message.success(result.message)
            this.requestData()
            this.state.selectRowItem = {}
            this.state.selectedRowKeys = null

        }
        this.setState({ isShowFinishOrder: false })
    }
    handleRowClick = (selectRowItem, index) => {
        const selectedRowKeys = [index]
        this.setState({ selectRowItem, selectedRowKeys })
    }
    render() {
        let colums = [
            { title: '订单编号', dataIndex: 'order_sn' },
            { title: '车辆编号', dataIndex: 'car_sn' },
            { title: '用户名', dataIndex: 'user_name' },
            { title: '手机号码', dataIndex: 'mobile' },
            { title: '里程', dataIndex: 'mileage' },
            { title: '行程时长', dataIndex: 'mileage_date' },
            { title: '状态', dataIndex: 'status' },
            { title: '开始时间', dataIndex: 'start_time' },
            { title: '结束时间', dataIndex: 'end_time' },
            { title: '订单金额', dataIndex: 'order_salary' },
            { title: '实付金额', dataIndex: 'pay_salary' }
        ]
        colums = colums.map((item, index) => {
            item.key = index
            return item
        })
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
        const { list, pagination, isShowOrder, isShowFinishOrder, selectedRowKeys, selectRowItem } = this.state
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const { car_sn, start_time } = selectRowItem
        return (
            <div>
                <Card className='card'>
                    <FilterForm />
                </Card>
                <Card className='card'>
                    <Button type='primary' onClick={this.handleOrderDetail}>订单详情</Button>
                    <Button type='primary' onClick={this.handleFinishOrder} disabled={selectRowItem.car_sn ? false : true}>结束订单</Button>
                    <Table
                        columns={colums}
                        dataSource={list}
                        pagination={pagination}
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: event => this.handleRowClick(record, index), // 点击行
                            };
                        }} />
                </Card>
                <Modal
                    title='订单详情'
                    visible={isShowOrder}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    cancelText='取消'
                    okText='确定'
                >
                </Modal>
                <Modal
                    title='结束订单'
                    visible={isShowFinishOrder}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    cancelText='取消'
                    okText='确定'
                >
                    <Form {...formItemLayout}>
                        <Item label='车辆编号'>{car_sn}</Item>
                        <Item label='剩余电量'>100%</Item>
                        <Item label='行程开始时间'>{start_time}</Item>
                        <Item label='当前位置'>奥林匹克公园</Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Order