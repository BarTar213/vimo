export function dateMapping (date) {
  const resultDate = new Date(Date.parse(date))
  return resultDate.toLocaleDateString()
}
