
const Utils = {
    date2Dou(num) {
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
    m2Km(distance) {
        return `${distance / 1000}km`
    },
    pagination(result, callback) {
        const { page, page_size, total_count } = result
        const pages = {
            onChange: (current) => {
                callback(current)
            },
            page,
            pageSize: page_size,
            total: total_count,
            showTotal: () => `共${total_count}条`,
            // showQuickJumper: true
        }
        return pages
    }
}

export default Utils