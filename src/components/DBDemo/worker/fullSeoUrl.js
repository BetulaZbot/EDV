import { Worker } from 'core-element'

export default class extends Worker {

    async getSeoLinks() {
        const param = {
            orgCityCode: 1602,
            dstCityCode: 3102
        }
        let rst = await this.curl('COMMON:QUERY:FULLSEOURL', param);
        //处理
        try {
            if (rst.success && rst.data) {
                return rst.data;
            }
        } catch (error) {
            return null;
        }
    }

}