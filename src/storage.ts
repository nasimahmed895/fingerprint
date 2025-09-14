
export function setStorage(key: string, value: string) {
    if (typeof window !== "undefined") {
        // Browser
        try {
            localStorage.setItem(key, value);
            document.cookie = `${key}=${value}; path=/; max-age=31536000`;
        } catch { }
    } else {
        // Node.js fallback (in-memory)
        //@ts-ignore
        globalThis[key] = value;
    }
}

export function getStorage(key: string): string | null {
    if (typeof window !== "undefined") {
        try {
            return localStorage.getItem(key) || null;
        } catch {
            return null;
        }
    } else {
        //@ts-ignore
        return globalThis[key] || null;
    }
}

export function deleteStorage(key: string) {
    if (typeof window !== "undefined") {
        try {
            localStorage.removeItem(key);
            document.cookie = `${key}=; Max-Age=0`;
        } catch { }
    } else {
        //@ts-ignore
        delete globalThis[key];
    }
}
