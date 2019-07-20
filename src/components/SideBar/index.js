import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './index.less'
import menuConfig from '../../config/menuConf'
import Logo from '../../assets/logo-ant.svg'
const { SubMenu } = Menu;

class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rootSubmenuKeys: [],
            openKeys: [],
        }
    }
    depComp = (datas) => {
        let rootSubmenuKeys = []
        datas.forEach(item => {
            if (item.children) {
                rootSubmenuKeys.push(item.path)
            }
        });
        this.setState({
            rootSubmenuKeys
        })
    }
    renderMenu = (datas) => {
        return datas.map(item => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>

                                <Icon type={item.icon ? item.icon : 'appstore'} />
                                <span>{item.title}</span>

                            </span>
                        }
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>

                )
            }
            return (
                <Menu.Item key={item.path}>
                    <NavLink to={item.path}>
                        <Icon type={item.icon ? item.icon : 'appstore'} />
                        <span>{item.title}</span>
                    </NavLink>
                </Menu.Item>
            )
        })
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    componentWillMount() {
        this.depComp(menuConfig)
        const treeMenuNode = this.renderMenu(menuConfig)
        this.setState({
            treeMenuNode
        })
    }
    render() {
        const { collapsed } = this.props
        const { treeMenuNode } = this.state
        function showTitle() {
            if (!collapsed) {
                return (<h1>管理系统</h1>)
            }
        }
        return (
            <div>
                <Menu
                    defaultSelectedKeys={['/dashboard']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    className='menu'
                >
                    <div className='logo'>
                        <img src={Logo} alt='' />
                        {showTitle()}
                    </div>
                    {treeMenuNode}
                </Menu>
            </div>
        )
    }
}

export default SideBar