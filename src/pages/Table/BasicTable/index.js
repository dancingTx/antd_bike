import React, {Component} from 'react'
import { Card, Table } from 'antd';
import './index.less'
class BasicTable extends Component {
    componentWillMount(){
        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ];
        this.setState({ dataSource })
    }
    render(){
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
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
        const { dataSource } = this.state
        return (
            <Card title='基础表格'>
                <Table dataSource={dataSource} columns={columns} bordered></Table>
            </Card>
        )
    }
}

export default BasicTable