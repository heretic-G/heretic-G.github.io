```javascript

function getWeekFirst (weekNum, year = (new Date()).getFullYear()) {
    const date = new Date(`${year}-01-01`)
    const days = weekNum * 7
    const week = date.getDay()
    date.setDate(days + 2 - week)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

```
平移第N周的天数 然后处理下其实1月1日的差 直接格式化输出
