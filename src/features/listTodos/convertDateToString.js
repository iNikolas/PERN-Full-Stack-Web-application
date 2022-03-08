const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

const convertDateToString = (dateCreated) => {
  const now = new Date()
  const dateDiff = now - dateCreated
  const isSameDay = '' + now.getFullYear() + now.getDate() + now.getDay() === '' + dateCreated.getFullYear() + dateCreated.getDate() + dateCreated.getDay()
  const isSameYear = now.getFullYear() === dateCreated.getFullYear()

  if (dateDiff < 30000) return 'Just now'
  if (dateDiff < 300000) return 'Recently'
  if (isSameDay) return `${always2Digits(dateCreated.getHours())}:${always2Digits(dateCreated.getMinutes())}`
  if (isSameYear) return getDayAndMonth(dateCreated)
  return `${getDayAndMonth(dateCreated)} ${dateCreated.getFullYear()}`
}

module.exports = convertDateToString

function always2Digits(num) {
  return num < 10 ? '0' + num : num + ''
}

function getDayAndMonth(date) {
  return `${always2Digits(date.getDay() + 1)} ${month[date.getDate()]}`
}