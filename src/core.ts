import { getDeviceInfo } from "./device";
import { getIP } from "./ip";
import { setStorage, getStorage, deleteStorage } from "./storage";

const DEFAULT_KEY = process.env.FP_COOKIE_KEY || "fp_id";

export function generateFingerprint(length = 32): string {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

    let fingerprint = "";

    while (fingerprint.length < length) {
        const type = Math.floor(Math.random() * 3);

        if (type === 0) {
            fingerprint += upper[Math.floor(Math.random() * upper.length)];
        } else if (type === 1) {
            fingerprint += lower[Math.floor(Math.random() * lower.length)];
        } else {
            const number = digits[Math.floor(Math.random() * digits.length)];
            fingerprint += number;
        }
    }

    return fingerprint.slice(0, length);
}

export async function storeFingerprint(id: string) {
    return setStorage(DEFAULT_KEY, id);
}

export function getStoredFingerprint(): string | null {
    return getStorage(DEFAULT_KEY);
}

export function deleteFingerprint(): void {
    deleteStorage(DEFAULT_KEY);
}

export function compareFingerprint(id: string): boolean {
    const stored = getStoredFingerprint();
    return stored === id;
}

export function isFingerprintValid(id: string): boolean {
    return typeof id === "string" && id.length > 0;
}

export async function logFingerprintData() {
    return {
        fingerprint: getStoredFingerprint(),
        device: getDeviceInfo(),
        ip: await getIP(),
    };
}

export async function updateFingerprint() {
    const newId = generateFingerprint();
    await storeFingerprint(newId);
    return newId;
}
