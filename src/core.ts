import { getDeviceInfo } from "./device";
import { getIP } from "./ip";

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

