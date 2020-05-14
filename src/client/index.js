/**
 * PC 平台DEMO
 * 交互选择jquery
 */

import * as Model from 'core-curl'
import * as $ from 'axios'
import { Platform } from 'core-element'


// cookie操作类
// import { time as NDate, StringExpand } from '@tuniu/toolbox'

class PCPlatform extends Platform {

    constructor() {
        super();
        //jquery实例
        this.$model = Model({
            engine: $,
            loader: 'axios'
        })

    }
    async sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }
    redirect(url) {
        window.location = url
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    // 获取环境变量
    env() {
        const $store = window.sessionStorage
        const methods = $store && $store.getItem('methods') || ''

        if (methods) {
            return methods || 'prd'
        }
        const host = window.location.host
        if (/127\.0\.0\.1/.test(host) || /localhost/.test(host)) {
            return 'dev'//'dev'
        }
        const hostList = {
            'sit.demo.com': 'sit',
            'pre.demo.com': 'pre',
            'prd.demo.com': 'prd'
        }
        let env = 'prd'
        Object.keys(hostList).filter((h) => {
            const r = new RegExp(h)
            if (r.test(host)) {
                env = hostList[h]
            }
        })[0]
        return env
    }
    domain() {
        const domains = {
            "prd": 'prd.demo.com',
            "pre": 'pre.demo.com',
            "sit": 'sit.demo.com',
        }
        return domains[this.env()];
    }

    goBack() {
        if (document.referrer) {
            window.history.go(-1);
        } else {
            window.location.href = "/";
        }
    }
    async curl(params) {
        return this.$model.curl(params)
    }

    async import(name, type) {
        let rst = null;

        const packages = (await this.config("PLATFORM")).packages
        const getFunc = packages[name]
        //从配置文件获取包或者从安装路径获取包
        const pkg = getFunc ? await getFunc() : await import(name)
        if (!pkg) {
            throw new Error("client:can not find comment:" + name)
        }
        rst = this.packageExport(pkg)
        let exportFunc = rst[type]
        if (!exportFunc) {
            throw new Error(`client:can not find ${type} in ${name}`)
        }
        rst = exportFunc;
        return rst
    }
    async importConfig(env) {
        let common = this.packageExport(await import('./config'))
        let list = {
            dev: async () => {
                let config = await import('./config/dev/config.js')
                let param = await import('./config/dev/param.js')
                return { ...(param.default || {}), ...(config || {}) }
            },
            sit: async () => {
                let config = await import('./config/sit/config.js')
                let param = await import('./config/sit/param.js')
                return { ...(param.default || {}), ...(config || {}) }
            },
            pre: async () => {
                let config = await import('./config/pre/config.js')
                let param = await import('./config/pre/param.js')
                return { ...(param.default || {}), ...(config || {}) }
            },
            prd: async () => {
                let config = await import('./config/prd/config.js')
                let param = await import('./config/prd/param.js')
                return { ...(param.default || {}), ...(config || {}) }
            }
        }
        let fn = list[env]
        let envSet = {}
        if (typeof fn === 'function') {
            envSet = await fn()
        }

        return { ...common, ...envSet }
    }
}
let $PP = new PCPlatform()
//添加插件
// $PP.use(async () => {
//     console.log($PP.$config);
//     //初始化时间
//     NDate.init(null, (await $PP.config("TIME")).zone);
//     //字符类方法扩展
//     StringExpand();
// })
// $PP.use(async () => {
//     DB.config.$platform = $PP;
// })
export default $PP;