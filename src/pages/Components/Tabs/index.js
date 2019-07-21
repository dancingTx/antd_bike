import React, { Component } from 'react'
import { Card, Tabs, Icon, message } from 'antd'
import './index.less'
const { TabPane } = Tabs
class Tab extends Component {
    newTabIndex = 0;
    componentWillMount(){
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            {
                title: 'Tab 3',
                content: 'Content of Tab 3',
                key: '3',
                closable: false,
            },
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }
    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab_${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };
    openTab = (key) => {
        message.info(`打开了:${key} Tab`)
    }
    render(){
        const tab1 = (<span><Icon type="apple" />Tab 1</span>)
        const tab2 = (<span><Icon type="windows" />Tab 1</span>)
        const tab3 = (<span><Icon type="android" />Tab 1</span>)
        const { activeKey, panes } = this.state
        return (
            <div>
                <Card title='基础选项卡' className='card'>
                    <Tabs defaultActiveKey="1" onChange={this.openTab}>
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title='图标选项卡' className='card'>
                    <Tabs defaultActiveKey="1" onChange={this.openTab}>
                        <TabPane tab={tab1} key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab={tab2} key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab={tab3} key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </Card>
                <Card title='动态选项卡' className='card'>
                    <Tabs
                        onChange={this.onChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        )
    }
}

export default Tab