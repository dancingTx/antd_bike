import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd';
import './index.less'
import { tableList } from '../../../api/table'
import Utils from '../../../utils/utils'
const { pagination } = Utils
const { confirm } = Modal
const { success } = message
class BasicTable extends Component {
    params = {
        page: 1
    }
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
        const { code, result } = await tableList(this.params.page)
        const { list } = result
        if (code === 0) {
            list.map((item, index) => item.key = index)
            this.setState({
                list, pagination: pagination(result, (current) => {
                    this.params.page = current
                    this.requestData()
            }) })
        }
    }
    handleRowClick = (selectRowItem, index) => {
        const selectedRowKeys = [index]
        this.setState({ selectRowItem, selectedRowKeys })
    }
    handleRowsDel = () => {
        let { selectRowList } = this.state
        const ids = selectRowList && selectRowList.map(item => item.id)
        ids && confirm({
            content: `是否删除以下数据:${ids}`,
            onOk: () => success('删除成功!'),
            onCancel() { },
        });

    }
    render() {
        const { dataSource, list, selectedRowKeys, selectedCheckRowKeys, pagination } = this.state
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
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys: selectedCheckRowKeys,
            onChange: (selectedCheckRowKeys, selectRowList) => {
                this.setState({ selectedCheckRowKeys, selectRowList })
            }
        }
        return (
            <div>
                <Card title='基础表格' className='card'>
                    <Table dataSource={dataSource} columns={columns} bordered />
                </Card>
                <Card title='动态渲染表格-Mock' className='card'>
                    <Table dataSource={list} columns={columns} bordered />
                </Card>
                <Card title='单选按钮表格' className='card'>
                    <Table
                        dataSource={list}
                        columns={columns}
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: event => this.handleRowClick(record, index), // 点击行
                            };
                        }}
                    />
                </Card>
                <Card title='复选按钮表格' className='card'>
                    <Button type='primary' onClick={this.handleRowsDel}>删除</Button>
                    <Table
                        dataSource={list}
                        columns={columns}
                        bordered
                        rowSelection={rowCheckSelection}
                    />
                </Card>
                <Card title='基础表格分页' className='card'>
                    <Table
                        dataSource={list}
                        columns={columns}
                        bordered
                        pagination={pagination}
                    />
                </Card>
            </div>
        )
    }
}

export default BasicTable