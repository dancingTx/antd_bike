import React, { Component } from 'react'
import { Button, Icon, Row, Col, TreeSelect } from 'antd';
import Utils from '../../utils/utils'
import Request from '../../utils/request'
import cityConf from '../../config/cityConf'
import './index.less'
class Header extends Component {
    state = {
        city_name: 'beijing'
    }
    componentWillMount(){
        this.setState({
            username:'leo'
        })
        setInterval(()=>{
            const sysTime = Utils.formatDate(Date.now())
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherData(this.state.city_name)
    }
    getWeatherData = (city)=>{
        Request.JsonP({
            url:`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=D4eGHS2tznnYLwDhgEBmwfOBe6O9Fhad`
        }).then((data,err)=>{
            const { dayPictureUrl, nightPictureUrl, temperature, weather, wind } = data[0].weather_data[0]
            this.setState({
                    dayPictureUrl,
                    nightPictureUrl,
                    temperature,
                    weather,
                    wind
            })
        })
    }
    handleChangeCity = (city_name)=>{
        this.setState({ city_name })
        this.getWeatherData(city_name)
    }
    render(){
        return (
            <div className='header'>
                <Row className='header_top'>
                    <Col span={18}>
                        <Button type="primary" onClick={this.props.toggleCollapsed} className='toggle'>
                            <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                    </Col>
                    <Col span={6}>
                        <span>欢迎，{this.state.username}</span>
                        <a href='http://www.baidu.com'>退出</a>
                    </Col>
                </Row>
                <Row className='header_bottom'>
                    <Col span={12} className='breadcrumb'>首页</Col>
                    <Col span={12} className='detail'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather'>
                            <img src={this.state.dayPictureUrl} alt='' />
                            {this.state.weather}/{this.state.temperature}
                        </span>
                        <TreeSelect
                            className='tree_select'
                            value={this.state.city_name}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={cityConf}
                            placeholder='切换城市'
                            treeDefaultExpandAll
                            onChange={this.handleChangeCity}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Header