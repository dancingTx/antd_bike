import React, { Component } from 'react'
import { Card, Spin, Icon, Alert, Switch } from 'antd'
import './index.less'
class Loading extends Component {
    state={
        loading:false
    }
    toggleLoading = ()=>{
        this.setState({ loading: !this.state.loading })
    }
    render() {
        const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} ></Icon>
        const { loading } = this.state
        return (
            <div>
                <Card title='基础Spin' className='card'>
                    <Spin size="small" className='spin' />
                    <Spin className='spin' />
                    <Spin size="large" className='spin' />
                    <Spin indicator={loadingIcon} className='spin' />
                </Card>
                <Card title='内容遮罩' className='card'>
                    <div className='toggle'>
                        Loading State:
                        <Switch checked={loading} onChange={this.toggleLoading} />
                    </div>
                    <Spin spinning={loading} delay={300}>
                        <Alert
                            message="Info Title"
                            description="description"
                            type="info"
                        />
                    </Spin>
                    <Spin tip='加载中...' spinning={loading}>
                        <Alert
                            message="Warning Title"
                            description="description"
                            type="warning"
                        />
                    </Spin>
                    <Spin indicator={loadingIcon} spinning={loading}>
                        <Alert
                            message="Warning Title"
                            description="description"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}

export default Loading