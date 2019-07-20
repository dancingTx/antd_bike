import React, { Component } from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './index.less'
class Buttons extends Component {
    state = {
        loading: false,
        icon_loading: false,
        size:'small'
    }
    enterLoading = () => {
        this.setState({
            loading: true
        })
    }
    enterIconLoading = () => {
        this.setState({
            icon_loading: true
        })
    }
    loadingOff = () => {
        this.setState({
            loading: false,
            icon_loading: false
        })
    }
    handleSizeChange = (e)=>{
        this.setState({
            size: e.target.value
        })
    }
    render() {
        const { loading,icon_loading,size } = this.state
        return (
            <div>
                <Card title='基础按钮' className='card'>
                    <Button type='primary'>按钮</Button>
                    <Button>按钮</Button>
                    <Button type='dashed'>按钮</Button>
                    <Button type='danger'>按钮</Button>
                    <Button disabled>按钮</Button>
                </Card>
                <Card title='图形按钮' className='card'>
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon='delete'>删除</Button>
                    <Button shape='circle' icon='search' />
                    <Button icon='search' type='primary'>搜索</Button>
                    <Button icon='download' type='primary'>下载</Button>
                </Card>
                <Card title='Loading按钮' className='card'>
                    <Button loading type='primary'>确定</Button>
                    <Button shape='circle' loading type='primary' />
                    <Button loading={loading} onClick={this.enterLoading} >点击加载</Button>
                    <Button loading={icon_loading} onClick={this.enterIconLoading} icon='poweroff'>点击加载</Button>
                    <Button shape='circle' loading />
                    <Button type='primary' onClick={this.loadingOff}>关闭</Button>
                </Card>
                <Card title='按钮组' className='card0'>
                    <Button.Group>
                        <Button type="primary"><Icon type="left" />后退</Button>
                        <Button type="primary">前进<Icon type="right" /></Button>
                    </Button.Group>
                </Card>
                <Card title='按钮尺寸' className='card'>
                    <Radio.Group value={size} onChange={this.handleSizeChange}>
                        <Radio value='small'>小</Radio>
                        <Radio value='default'>中</Radio>
                        <Radio value='large'>大</Radio>
                    </Radio.Group>
                    <Button type='primary' size={size}>按钮</Button>
                    <Button size={size}>按钮</Button>
                    <Button type='dashed' size={size}>按钮</Button>
                    <Button type='danger' size={size}>按钮</Button>
                    <Button size={size} disabled>按钮</Button>
                </Card>
            </div>
        )
    }
}

export default Buttons