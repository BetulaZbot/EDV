import { db, table, setState } from 'core-dbjs'
//学校-班级-学生

export default class extends table {
    name: string//姓名
    type: number = 0//类型 0-学生 1-老师
    subject: string//学科
    likeNum = 0;
    constructor() {
        super('People');
    }
    isStudent() {
        return this.type !== 1;
    }
    @setState()
    get profession() {
        return this.type == 0 ? `学生` : `老师`
    }
    @setState()
    skill() {
        return this.type == 0 ? "学习" : `教${this.subject}`
    }

    like(num) {
        this.likeNum = this.likeNum + num;
    }
}