export const getColumnFilter = (column) => {
    let filter = []
    for (const [key, value] of Object.entries(column)) {
        filter.push({ text: value, value: key })
    }
    return filter
}