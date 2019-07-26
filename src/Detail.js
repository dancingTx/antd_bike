import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Header from './components/Header'
import './style/common.less'
class Detail extends Component {
    render() {
        return (
            <div className='container'>
                <Col className='main'>
                    <Row className='simple-page'>
                        <Header menuType='second' />
                    </Row>
                    <Row className='content'>
                        {this.props.children}
                    </Row>
                </Col>
            </div>
        )
    }
}

export default Detail
