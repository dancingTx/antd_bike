import React, { Component } from 'react'
import { Row, Col } from 'antd';
import SideBar from './components/SideBar'
import Header from './components/Header'
import Footer from './components/Footer'
import './style/common.less'
class LayOut extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Row className='container'>
                <Col span={this.state.collapsed ? 2 : 4} className='sidebar'>
                    <SideBar collapsed={this.state.collapsed} />
                </Col>
                <Col span={this.state.collapsed ? 22 : 20} className='main'>
                    <Header collapsed={this.state.collapsed} toggleCollapsed={this.toggleCollapsed} />
                    <Row className='content'>
                        {this.props.children}
                    </Row>
                    <Footer className='footer' />
                </Col>
            </Row>
        )
    }
}

export default LayOut
