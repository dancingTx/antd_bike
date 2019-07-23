
const Utils = {
    date2Dou(num){
        return num < 10 ? `0${num}` : num
    },
    formatDate(time) {
        if (!time) return ''
        const date = new Date(time)
        const years = date.getFullYear()
        const months = this.date2Dou(date.getMonth() + 1)
        const days = this.date2Dou(date.getDate())
        const hours = this.date2Dou(date.getHours())
        const minutes = this.date2Dou(date.getMinutes())
        const seconds = this.date2Dou(date.getSeconds())
        return `${years}/${months}/${days} ${hours}:${minutes}:${seconds}`
    },
    pagination(result,callback) {
        const { current, pageSize, total } = result
        const page = {
            onChange: (current) => {
                callback(current)
            },
            current,
            pageSize,
            total,
            showTotal: () => `共${total}条`,
            // showQuickJumper: true
        }
        return page
    }
}

export default Utils