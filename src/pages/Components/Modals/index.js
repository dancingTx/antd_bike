import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
class Modals extends Component {
    state = {
        basic_visible: false,
        custom_visible: false,
        top_visible: false,
        center_visible: false
    }
    showModal = (type) => {
        this.setState({
            [type]: true
        })
    }
    handleOk = (type) => {
        this.setState({
            [type]: false
        })
    }
    handleCancel = (type) => {
        this.setState({
            [type]: false
        })
    }
    showMessage = (type) => {
        Modal[type]({
            title: type.substring(0, 1).toUpperCase() + type.slice(1),
            content: 'Content',
            onOk() { },
            onCancel() { },
        })
    }
    render() {
        const { basic_visible, custom_visible, top_visible, center_visible } = this.state
        return (
            <div>
                <Card title='基础模态框' className='card'>
                    <Button type="primary" onClick={() => this.showModal('basic_visible')}>Open</Button>
                    <Button type="primary" onClick={() => this.showModal('custom_visible')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.showModal('top_visible')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.showModal('center_visible')}>垂直水平居中</Button>
                    <Modal
                        title="Basic Modal"
                        visible={basic_visible}
                        onOk={() => this.handleOk('basic_visible')}
                        onCancel={() => this.handleCancel('basic_visible')}
                    >
                        <span>Content</span>
                    </Modal>
                    <Modal
                        title="Custom Modal"
                        visible={custom_visible}
                        okText='确定'
                        cancelText='取消'
                        onOk={() => this.handleOk('custom_visible')}
                        onCancel={() => this.handleCancel('custom_visible')}
                    >
                        <span>Content</span>
                    </Modal>
                    <Modal
                        title="20px to Top Modal"
                        style={{ top: 20 }}
                        visible={top_visible}
                        onOk={() => this.handleOk('top_visible')}
                        onCancel={() => this.handleCancel('top_visible')}
                    >
                        <span>Content</span>
                    </Modal>
                    <Modal
                        title="centerd Modal"
                        centered
                        visible={center_visible}
                        onOk={() => this.handleOk('center_visible')}
                        onCancel={() => this.handleCancel('center_visible')}
                    >
                        <span>Content</span>
                    </Modal>
                </Card>
                <Card title='信息确认框' className='card'>
                    <Button type="primary" onClick={() => this.showMessage('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.showMessage('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.showMessage('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.showMessage('error')}>Error</Button>
                    <Button type="primary" onClick={() => this.showMessage('warning')}>Warning</Button>
                </Card>
            </div>
        )
    }
}

export default Modals