import { db, table, setState } from 'core-dbjs'
//学校-班级-学生
class Class extends table {
    name
    constructor() {
        super('Class');
        this.initTables(['People'])
    }
    @setState()
    get teacherList() {
        return this.selectFrom("People").where("type == 1").findAll(true);;
    }
    @setState()
    get studentList() {
        return this.selectFrom("People").where("isStudent()").findAll(true);
    }


}

export default Class