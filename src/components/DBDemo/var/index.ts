import { db } from 'core-dbjs'
import Class from './class'
import People from './people'
//学校-班级-学生
class School extends db {
    name = '新东方'
    location = '山东'
    constructor(name, updateView) {
        super(name, updateView);
        //声明所属的表
        this.initTables(['Class'])
    }
    initDemoDate() {
        //这个方法的入参应该由接口传入
        let mClass0 = new Class()
        //表声明后应该立即save到库,才能够执行save操作
        this.save(mClass0)
        mClass0.name = "一班"
        let mTeacher0 = new People()
        mTeacher0.name = "高老师"
        mTeacher0.type = 1;
        mTeacher0.subject = "炒菜";
        mClass0.save(mTeacher0);
        let mStudent0 = new People()
        mStudent0.name = "张三"
        let mStudent1 = new People()
        mStudent1.name = "李四"
        mClass0.saveAll([mStudent0, mStudent1]);

    }
}

export default School