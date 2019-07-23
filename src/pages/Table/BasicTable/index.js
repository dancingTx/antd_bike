import React, { Component } from 'react'
import { Card, Table } from 'antd';
import './index.less'
import { tableList } from '../../../api/table'
class BasicTable extends Component {
    componentWillMount() {
        const dataSource = [
            {
                "id": 1,
                "name": "彭洋",
                "gender": 2,
                "status": 4,
                "age": 57,
                "address": "甘肃省 平凉市 华亭县"
            },
            {
                "id": 2,
                "name": "彭洋",
                "gender": 2,
                "status": 4,
                "age": 57,
                "address": "甘肃省 平凉市 华亭县"
            },
        ];
        dataSource.map((item, index) => item.key = index)
        this.setState({ dataSource })
        this.requestData()
    }
    requestData = async () => {
        const { data, status } = await tableList()
        const { code, result } = data
        if (status === 200 && code === 0) {
            result.map((item, index) => item.key = index)
            this.setState({ result })
        }
    }
    handleRowClick = (selectRowItem, index) => {
        const selectedRowKeys = [index]
        this.setState({ selectRowItem, selectedRowKeys })
    }
    render() {
        const { dataSource, result, selectedRowKeys } = this.state
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                render: (gender) => {
                    return gender === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                    let conf = {
                        1: '有为青年',
                        2: '咸鱼一条',
                        3: '俊男靓女',
                        4: '街头霸王',
                        5: '青年才俊'
                    }
                    return conf[status]
                }
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
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card title='基础表格' className='card'>
                    <Table dataSource={dataSource} columns={columns} bordered />
                </Card>
                <Card title='动态渲染表格-Mock' className='card'>
                    <Table dataSource={result} columns={columns} bordered />
                </Card>
                <Card title='单选按钮表格' className='card'>
                    <Table
                        dataSource={result}
                        columns={columns}
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                                onClick: event =>  this.handleRowClick(record, index) , // 点击行
                            };
                        }}
                    />
                </Card>
            </div>
        )
    }
}

export default BasicTable