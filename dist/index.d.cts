declare function generateFingerprint(length?: number): string;
declare function storeFingerprint(id: string): Promise<void>;
declare function getStoredFingerprint(): string | null;
declare function deleteFingerprint(): void;
declare function compareFingerprint(id: string): boolean;
declare function isFingerprintValid(id: string): boolean;
declare function logFingerprintData(): Promise<{
    fingerprint: string | null;
    device: {
        platform: NodeJS.Platform;
        node: string;
        userAgent?: undefined;
        language?: undefined;
        screen?: undefined;
    } | {
        userAgent: string;
        platform: string;
        language: string;
        screen: {
            width: number;
            height: number;
        };
        node?: undefined;
    };
    ip: any;
}>;
declare function updateFingerprint(): Promise<string>;

declare function getDeviceInfo(): {
    platform: NodeJS.Platform;
    node: string;
    userAgent?: undefined;
    language?: undefined;
    screen?: undefined;
} | {
    userAgent: string;
    platform: string;
    language: string;
    screen: {
        width: number;
        height: number;
    };
    node?: undefined;
};

declare function getIP(): Promise<any>;

export { compareFingerprint, deleteFingerprint, generateFingerprint, getDeviceInfo, getIP, getStoredFingerprint, isFingerprintValid, logFingerprintData, storeFingerprint, updateFingerprint };
