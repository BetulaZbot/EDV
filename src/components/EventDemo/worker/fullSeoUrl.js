import { Worker, recordRst } from 'core-element'

export default class extends Worker {
    @recordRst()
    async getSeoLinks() {
        const param = {
            orgCityCode: 1602,
            dstCityCode: 3102
        }
        let rst = await this.curl('COMMON:QUERY:FULLSEOURL', param);
        //处理
        try {
            if (rst.success && rst.data) {
                return rst.data || 1;
            }
        } catch (error) {
            return 1;
        }
        return 1;
    }

}