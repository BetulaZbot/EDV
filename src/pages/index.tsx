import React from 'react'
import $UP from '../client'

export default class extends React.Component<any,any> {
    DBDemo
    EventDemo
    state = { isInit: false }
    getAsyncComponent(Component) {
        return Component ? <Component></Component> : null;
    }
    async componentDidMount() {
        this.DBDemo = await $UP.import('DBDemo', "VIEW");
        this.EventDemo = await $UP.import('EventDemo', "VIEW");
        this.setState({ isInit: true })
    }
    render() {
        return <div>
            <h1>状态管理器</h1>
            {this.getAsyncComponent(this.DBDemo)}
            <h1>事件管理器&模块化</h1>
            {this.getAsyncComponent(this.EventDemo)}
        </div >
    }
}
