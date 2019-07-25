import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import menuConf from '../config/menuConf'
import App from '../App'
import Login from '../pages/Login'
import LayOut from '../LayOut'
import Detail from '../Detail'
import Page404 from '../pages/error/Page404'
class Routes extends Component {
    LoopRoute = (datas) => {
        return datas.map(item => {
            if (item.children) {
                return this.LoopRoute(item.children)
            }
            return (<Route key={item.path} path={item.path} component={item.component}></Route>)
        })
    }
    componentWillMount() {
        const routes = this.LoopRoute(menuConf)
        this.setState({
            routes
        })
    }
    render() {
        const { routes } = this.state
        return (
            <Router>
                <Route path='/' exact render={() => (
                    <Redirect to={'/admin/home'} />
                )} />
                <App>
                    <Route path='/login' component={Login} />
                    <Route path='/admin' render={() => (
                        <LayOut>
                            <Switch>
                                {routes}
                                <Route component={Page404} />
                            </Switch>
                        </LayOut>
                    )} />
                    <Route path='/detail' render={()=>(
                        <Detail>
                            <Switch>
                                {routes}
                                <Route component={Page404} />
                            </Switch>
                        </Detail>
                    )}/>
                </App>
            </Router>
        )
    }
}

export default Routes