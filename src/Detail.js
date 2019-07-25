import React, { Component } from 'react'
import { Row } from 'antd';
import Header from './components/Header'
import './style/common.less'
class LayOut extends Component {
    render() {
        return (
           <div>
                <Row className='container'>
                    <Header menuType='second' />
                </Row>
                <Row className='container'>
                    {this.props.children}
                </Row>
           </div>
        )
    }
}

export default LayOut
