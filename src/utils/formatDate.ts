function formatDate(dateString: string | Date) {
    var date = new Date(dateString);
    var day = date.getUTCDate().toString().padStart(2, "0");
    var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    var year = date.getUTCFullYear();
    var hours = date.getUTCHours().toString().padStart(2, "0");
    var minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
}

export default formatDate