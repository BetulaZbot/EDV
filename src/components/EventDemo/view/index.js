
import $UP from 'root/client'
import './index.css'
import React, { Component } from 'react'
import { setListener } from 'core-event'
export default class extends Component {


  constructor() {
    super();
  }

  @setListener("subscribe@EventDemo:fullSeoUrl:getSeoLinks")
  fun(res) {
    console.log("============数据取到了============:", res);
  }


  render() {
    return (
      <div>
        {this.props.text}

        <button onClick={async () => {
          let worker = await $UP.import('EventDemo', "WORKER");
          let data = await worker.commit("fullSeoUrl:getSeoLinks");
          this.props.dispatch({ text: "数据取到了:" + data })
        }}>获取数据</button>

        <button onClick={async () => {
          let worker = await $UP.import('EventDemo', "WORKER");
          let data = await worker.record("fullSeoUrl:getSeoLinks");
          this.props.dispatch({ text: "缓存数据取到了:" + data })
        }}>获取缓存数据</button>
      </div>
    )
  }
}