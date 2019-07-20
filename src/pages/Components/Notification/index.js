import React,{Component} from 'react'
import { Card, Button, notification,Select } from 'antd'
import './index.less'
const { Option } = Select
class Notification extends Component {
    state={
        local:'topRight'
    }
    openNotification = (type)=>{
        notification[type]({
            placement:this.state.local,
            message: 'Notification Title',
            description:
                'Content',
        });
    }
    handleChangeLocal=(local)=>{
        this.setState({ local })
    }
    render(){
        const { local } = this.state
        return(
            <div>
                <Card title='基础通知' className='card'>
                    <Button type='primary' onClick={() => this.openNotification('success')}>Success</Button>
                    <Button type='primary' onClick={() => this.openNotification('info')}>Info</Button>
                    <Button type='primary' onClick={() => this.openNotification('warning')}>Warning</Button>
                    <Button type='primary' onClick={() => this.openNotification('error')}>Error</Button>
                </Card>
                <Card title='通知方位' className='card'>
                    <Select defaultValue={local} className='select_local' onChange={this.handleChangeLocal}>
                        <Option value="topLeft">左上</Option>
                        <Option value="topRight">右上</Option>
                        <Option value="bottomLeft">左下</Option>
                        <Option value="bottomRight">右下</Option>
                    </Select>
                    <Button type='primary' onClick={() => this.openNotification('success')}>Success</Button>
                    <Button type='primary' onClick={() => this.openNotification('info')}>Info</Button>
                    <Button type='primary' onClick={() => this.openNotification('warning')}>Warning</Button>
                    <Button type='primary' onClick={() => this.openNotification('error')}>Error</Button>
                </Card>
            </div>
        )
    }
}

export default Notification