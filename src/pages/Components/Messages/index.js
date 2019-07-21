import React, {Component} from 'react'
import { Card, Button, message } from 'antd'
import './index.less'
class Message extends Component {
    openMessage = (type,duration)=>{
        return message[type]('Message',duration)
    }
    render(){
        return (
            <Card title='基础提示框' className='card'>
                <Button type='primary' onClick={()=>this.openMessage('success',3)}>Success</Button>
                <Button type='primary' onClick={()=>this.openMessage('info',5)}>Info</Button>
                <Button type='primary' onClick={()=>this.openMessage('error',1)}>Error</Button>
                <Button type='primary' onClick={()=>this.openMessage('warning',10)}>Warning</Button>
                <Button type='primary' onClick={() => this.openMessage('loading')}>Loading</Button>
            </Card>
        )
    }
}

export default Message