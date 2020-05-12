export default {
    //时间相关配置
    TIME: {
        //当前时区
        zone: 8
    },
    //平台相关配置
    PLATFORM: {
        //自定义包路径,权限最高
        packages: {
            "DBDemo": () => import("../../components/DBDemo"),
            "EventDemo": () => import("../../components/EventDemo"),
        }
    },

}				