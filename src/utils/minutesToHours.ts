function minutesToHours(minutes: number) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;
    var seconds = Math.round((remainingMinutes % 1) * 60);
    return hours.toFixed() + "h " + remainingMinutes.toFixed() + "min " + seconds.toFixed() + "s";
}

export default minutesToHours