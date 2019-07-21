import React,{Component} from 'react'
import { Carousel, Card } from 'antd'
import './index.less'
class Carousels extends Component {
    render() {
        function loopImg(num){
            let genImg=[]
            for (let i = 1; i <= num; i++) {
                genImg.push((<div>
                    <img alt='' width={400} src={require(`../../../assets/carousel-img/carousel-${i}.jpg`)} />
                    </div>)) 
            }
            return genImg
        }
        return (
            <div>
                <Card title='文字背景轮播图' className='card'>
                    <Carousel autoplay>
                        <div><h3>Angular</h3></div>
                        <div><h3>React</h3></div>
                        <div><h3>Vue</h3></div>
                    </Carousel>
                </Card>
                <Card title='图片背景轮播图' className='card'>
                    <div style={{ width: 400, margin:'0 auto' }}>
                        <Carousel autoplay >
                            {loopImg(3)}
                        </Carousel>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Carousels