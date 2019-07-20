import jsonp from 'jsonp'
class Request {
    static JsonP(options) {
        return new Promise((resolve, reject) => {
            jsonp(options.url, {
                param: 'callback'
            }, (err, data) => {
                if (data.status === 'success') {
                    resolve(data.results)
                } else {
                    reject(err)
                }
            })
        })
    }
}

export default Request