export async function getIP() {
    if (typeof fetch === "undefined") return null;

    try {
        const res = await fetch("https://api64.ipify.org?format=json");
        const data = await res.json();
        return data.ip;
    } catch {
        return null;
    }
}
