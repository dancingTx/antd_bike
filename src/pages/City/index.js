import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import './index.less'
import FilterForm from './component/FilterForm'
import OpenCityForm from './component/OpenCityForm'
import { cityList } from '../../api/city'
import Utils from '../../utils/utils'
import { openCity } from '../../api/city'

const { pagination } = Utils

class City extends Component {
    state = {
        list: []
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestData()
    }
    requestData = async () => {
        const { page } = this.params
        const { result } = await cityList(page)
        let { list } = result
        list = list.map((item, index) => {
            item.key = index
            item.city_admins = item.city_admins.map(item => item.user_name).join('、')
            item.car_mode = item.car_mode === 1 ? '指定停车点模式' : '禁停区模式'
            item.opt_mode = item.opt_mode === 1 ? '自营' : '加盟'
            item.update_date = Utils.formatDate(item.update_date)
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
    handleOpenCity = () => {
        this.setState({ isShowOpenCity: true })
    }
    handleCancel = () => {
        this.setState({ isShowOpenCity: false })
    }
    handleSubmit = () => {
        const { validateFields } = this.form_data.props.form
        validateFields(async (err, data) => {
            if (!err) {
                const {code,result} = await openCity(data)
                if(code === 0) {
                    message.success(result.message)
                    this.setState({ isShowOpenCity: false })
                }
            }
        })
    }
    render() {
        let colums = [
            { title: '城市ID', dataIndex: 'city_id' },
            { title: '城市名称', dataIndex: 'city_name' },
            { title: '用车模式', dataIndex: 'car_mode' },
            { title: '营运模式', dataIndex: 'opt_mode' },
            { title: '授权加盟商', dataIndex: 'auth_user' },
            { title: '城市管理员', dataIndex: 'city_admins' },
            { title: '城市开通时间', dataIndex: 'city_open_date' },
            { title: '操作时间', dataIndex: 'update_date' },
            { title: '操作人员', dataIndex: 'option_person' }
        ]
        colums = colums.map((item, index) => {
            item.key = index
            return item
        })
        const { list, pagination, isShowOpenCity } = this.state
        return (
            <div>
                <Card className='card'>
                    <FilterForm />
                </Card>
                <Card className='card'>
                    <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
                    <Table columns={colums} dataSource={list} pagination={pagination} bordered></Table>
                </Card>
                <Modal
                    title='开通城市'
                    visible={isShowOpenCity}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    cancelText='取消'
                    okText='确定'
                >
                    <OpenCityForm wrappedComponentRef={(instance) => { this.form_data = instance }} />
                </Modal>
            </div>
        )
    }
}

export default City