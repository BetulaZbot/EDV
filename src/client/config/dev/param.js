export default {
    API: {
        systemList: {
            DEMO: {
                port: 8088,
                host: "127.0.0.1",
                protocol: "http"
            }
        }
    },
    // 拦截器
    'interceptor': {
        'API': {
            'DEMO': {
                before(params) {
                    console.warn({ params })
                },
                after(result) {
                    console.warn({ result })
                }
            }

        }
    }

}
