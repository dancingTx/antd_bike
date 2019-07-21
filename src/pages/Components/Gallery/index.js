import React, { Component } from 'react'
import { Card, Col, Row, Modal } from 'antd'
import './index.less'
const { Meta } = Card
class Gallery extends Component {
    state = {
        visible: false
    }
    imgGen = (row, col) => {
        let imgList = []
        let count = 0
        for (let i = 1; i <= col; i++) {
            let newArr = []
            for (let j = 1; j <= row; j++) {
                newArr.push(j)
                count = row * (i - 1)
            }
            imgList.push(newArr.map(item => `${item + count}.png`))
        }
        return imgList
    }
    openGallery = (currentImg) => {
        this.setState({ visible: true, currentImg })
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    render() {
        const { visible, currentImg } = this.state
        const imgList = this.imgGen(5, 5).map(item => (
            item.map((item, i) => (
                <Card
                    hoverable
                    cover={<img alt="example" src={require(`../../../assets/gallery/${item}`)} />}
                    key={`key_${i}`}
                    className='card'
                    onClick={() => this.openGallery(item)}
                >
                    <Meta title="Title" description="description" />
                </Card>
            ))
        ))
        function showImg(list) {
            return <Row gutter={10}>
                {list.map((item, i, arr) => (
                    <Col key={`key_${i}`} span={i === arr.length - 1 ? 4 : 5}>{item}</Col>)
                )}
            </Row>
        }
        return (
            <div>
                {showImg(imgList)}
                <Modal
                    title="图片画廊"
                    visible={visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width={350}
                >
                    <img
                        alt=''
                        src={currentImg && require(`../../../assets/gallery/${currentImg}`)}
                        style={{ width: '100%' }}
                        />
                </Modal>
            </div>
        )
    }
}
export default Gallery