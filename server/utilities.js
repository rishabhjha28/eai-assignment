const isValidDate = (date) => {
    const dateObj = new Date(date)
    if (dateObj.toString() === "Invalid Date") {
        return false;
    }
    else {
        return true;
    }
}
const isWeekend = (date) => {
    const day = new Date(date).getDay();
    if (day === 0 || day === 6) {
        return true;
    }
    return false;
}
module.exports = { isValidDate, isWeekend }