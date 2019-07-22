import React, { Component } from 'react'
import { Card, Table } from 'antd';
import './index.less'
import { tableList } from '../../../api/table'
class BasicTable extends Component {
    componentWillMount() {
        const dataSource = [
            {   "key":1,
                "id": 5,
                "name": "彭洋",
                "gender": 2,
                "status": 4,
                "age": 57,
                "address": "甘肃省 平凉市 华亭县"
            },
            {
                "key": 2,
                "id": 5,
                "name": "彭洋",
                "gender": 2,
                "status": 4,
                "age": 57,
                "address": "甘肃省 平凉市 华亭县"
            },
        ];
        this.setState({ dataSource })
        this.requestData()
    }
    requestData = async () => {
        const { data, status } = await tableList()
        const { code, result } = data
        if (status === 200 && code === 0) {
            this.setState({ result })
        }
    }
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title:'性别',
                dataIndex:'gender',
                key:'gender'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        const { dataSource, result } = this.state
        return (
            <div>
                <Card title='基础表格' className='card'>
                    <Table dataSource={dataSource} columns={columns} bordered ></Table>
                </Card>
                <Card title='动态渲染表格' className='card'>
                    <Table dataSource={result} columns={columns} bordered></Table>
                </Card>
            </div>
        )
    }
}

export default BasicTable