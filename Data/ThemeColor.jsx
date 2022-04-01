export default function getThemeColor(isDay, transparent=1) {
    if (isDay) return [`rgba(21,187,247, ${transparent})`, `rgba(18,102,244, ${transparent})`];
    else if (!isDay) return [`rgba(145,98,235, ${transparent})`, `rgba(18,102,244, ${transparent})`];
}
