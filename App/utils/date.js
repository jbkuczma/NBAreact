export function getFormattedDate() {
  const d = new Date()
  return d.toLocaleDateString()
}

/**
 *
 * @param {string} date - date in format yyyymmdd
 * @return {string} - formatted string of date, ex: Apr 6
 */
export function formatDateString(date) {
  const year     = date.substring(0,4)
  const month    = date.substring(4,6)
  const day      = date.substring(6,8)

  const d        = new Date(year, month-1, day)
  let dateString = d.toDateString()

  // Wed Apr 11 2018 -> Apr 11
  dateString     = dateString.match(/[A-Z][a-z]{2}[\s0-9]{3}/)[0]
  return dateString
}
