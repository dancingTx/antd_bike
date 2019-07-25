import React, { Component } from 'react'
import { Card, Table, Badge, Button } from 'antd'
import Utils from '../../../utils/utils'
import { tableList } from '../../../api/table'
import './index.less'
const { pagination } = Utils
class SeniorTable extends Component {
    state = {
        list: []
    }
    componentWillMount() {
        this.requestData()
    }
    requestData = async () => {
        const { code, result } = await tableList()
        const { list } = result
        if (code === 0) {
            list.map((item, index) => item.key = index)
            this.setState({ list })
        }
    }
    render() {
        const { list } = this.state
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width:150
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                width: 150,
                render: (gender) => {
                    return gender === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 150,
                render: (status) => {
                    let conf = {
                        1: <Badge status="success" text="有为青年" />,
                        2: <Badge status="error" text="咸鱼一条" />,
                        3: <Badge status="default" text="俊男靓女" />,
                        4: <Badge status="processing" text="街头霸王" />,
                        5: <Badge status="warning" text="青年才俊" />
                    }
                    return conf[status]
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 150,
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: 160,
                render: (text, item) => <Button type='danger'>删除</Button>
            }
        ];
        return (
            <div>
                <Card title='固定表头表格' className='card'>
                    <Table
                        columns={columns}
                        dataSource={list}
                        pagination={pagination}
                        scroll={{ y: 240 }}
                        bordered />
                </Card>
                <Card title='固定列表格' className='card'>
                    <Table
                        columns={columns}
                        dataSource={list}
                        pagination={pagination}
                        bordered />
                </Card>
            </div>
        )
    }
}

export default SeniorTable