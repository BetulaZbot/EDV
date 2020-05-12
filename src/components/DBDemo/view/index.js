
import $UP from 'root/client'
import './index.css'
import React, { Component } from 'react'
import { setListener } from 'core-event'
export default class extends Component {

  constructor() {
    super();
  }
  componentDidMount() {
    this.props.dispatch(null, 'initDemoDate')
  }
  render() {
    return (
      <div>
        <h2>学校信息</h2>
        <p>名称:{this.props.name}</p>
        <h3>班级列表</h3>
        {this.props.ClassList.map((mClass) => {
          return <div>
            <h4>{mClass.name}</h4>
            <h5>老师列表</h5>
            {mClass.teacherList.map((mTeacher) => {
              return <div>
                <h6>{mTeacher.name}:{mTeacher.skill} 点赞数:{mTeacher.likeNum}<button onClick={() => { this.props.dispatch(1, "like", mTeacher) }}>点赞</button><button onClick={() => { this.props.dispatch({likeNum:0}, null, mTeacher) }}>清空点赞</button></h6>
              </div>
            })}
            <h5>学生列表</h5>
            {mClass.studentList.map((mStudent) => {
              return <h6>{mStudent.name}:{mStudent.skill}</h6>
            })}
          </div>
        })}
      </div>
    )
  }
}