import React, { Component } from 'react'
import { Card, Divider } from 'antd'
import './orderDetail.less'
import { orderDetail } from '../../api/order'
import Utils from '../../utils/utils'
const { m2Km } = Utils
class OrderDetail extends Component {
    state = {
        result: {}
    }
    componentWillMount() {
        const { order_id } = this.props.match.params
        if (order_id) {
            this.getDetailInfo(order_id)
        }
    }
    getDetailInfo = async (order_id) => {
        const { result } = await orderDetail(order_id)
        this.setState({ result })
        this.renderMap(result.position_list,result.area)
    }
    renderMap = (bike_point,area_point) => {
        this.map = new window.BMap.Map("orderDetailMap");          // 创建地图实例  
        this.addMapControl()
        this.drawBikeRoute(bike_point)
        this.drawServiceArea(area_point)
    }
    addMapControl = () => {
        const map = this.map
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_LEFT }));
    }
    // 绘制路线图
    drawBikeRoute = (position) => {
        let start_point, end_point = ''
        if (position.length) {
            // 开始点
            const start = position[0]
            start_point = new window.BMap.Point(start.lon, start.lat)
            const start_icon = new window.BMap.Icon(require('../../assets/start_point.png'), new window.BMap.Size(36, 41), {
                imageSize: new window.BMap.Size(36, 41),
                anchor: new window.BMap.Size(36, 41)
            })
            const start_marker = new window.BMap.Marker(start_point, { icon: start_icon })
            this.map.addOverlay(start_marker)
            // 结束点
            const end = position[position.length - 1]
            end_point = new window.BMap.Point(end.lon, end.lat)
            const end_icon = new window.BMap.Icon(require('../../assets/end_point.png'), new window.BMap.Size(36, 41), {
                imageSize: new window.BMap.Size(36, 41),
                anchor: new window.BMap.Size(36, 41)
            })
            const end_marker = new window.BMap.Marker(end_point, { icon: end_icon })
            this.map.addOverlay(end_marker)
            // 路线图
            let track_point = []
            position.forEach(({ lon, lat }) => {
                track_point.push(new window.BMap.Point(lon, lat))
            });
            const polyline = new window.BMap.Polyline(track_point, {
                strokeColor: "blue", strokeWeight: 6, strokeOpacity: 0.5
            });
            this.map.addOverlay(polyline);
            this.map.centerAndZoom(end_point, 11);
        }
    }
    // 绘制服务区
    drawServiceArea = (position) =>{
        let area_point = []
        position.forEach(({ lon, lat }) => {
            area_point.push(new window.BMap.Point(lon, lat))
        });
        const polygon = new window.BMap.Polygon(area_point, {
            strokeColor: "#CE0000", strokeWeight: 6, strokeOpacity: 0.5, fillColor:'#ff8605'
        });
        this.map.addOverlay(polygon);
    }
    render() {
        const { result } = this.state
        const orderdDetail = [
            {
                detail_title: '基础信息', detail_form: [
                    { detail_form_title: '用车模式', detail_form_content: result.mode === 1 ? '服务区' : '停车点' },
                    { detail_form_title: '订单编号', detail_form_content: result.order_sn },
                    { detail_form_title: '车辆编号', detail_form_content: result.bike_sn },
                    { detail_form_title: '用户姓名', detail_form_content: result.user_name },
                    { detail_form_title: '手机号码', detail_form_content: result.mobile },
                ]
            },
            {
                detail_title: '行驶轨迹', detail_form: [
                    { detail_form_title: '行驶起点', detail_form_content: result.start_location },
                    { detail_form_title: '行驶终点', detail_form_content: result.end_location },
                    { detail_form_title: '行驶里程', detail_form_content: m2Km(result.distance) },
                ]
            },
        ]
        return (
            <div>
                <Card>
                    <div id='orderDetailMap' className='order_map'></div>
                    <div className='detail_items'>
                        {
                            orderdDetail.map((item, index, arr) => (
                                <div key={index}>
                                    <div className='detail_title'>{item.detail_title}</div>
                                    <ul className='detail_form'>
                                        {
                                            item.detail_form.map((list, index) => (
                                                <li key={index}>
                                                    <div className='detail_form_title'>{list.detail_form_title}</div>
                                                    <div className='detail_form_content'>{list.detail_form_content}</div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    {arr.length - 1 === index ? '' : (<Divider />)}
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </div>
        )
    }
}

export default OrderDetail