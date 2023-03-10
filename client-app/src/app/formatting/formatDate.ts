export default function formatDate(newDate: string) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = new Date(newDate)
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const monthName = months[monthIndex]
    const dayName = days[d.getDay()] 
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const formatted = `${dayName}, ${date} ${monthName} ${year}, ${hours}:${minutes}`
    return formatted.toString()
}