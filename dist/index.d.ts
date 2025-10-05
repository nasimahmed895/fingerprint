declare function generateFingerprint(length?: number): string;

declare function getDeviceInfo(): {
    environment: string;
    platform: NodeJS.Platform;
    nodeVersion: string;
    cpuArch: NodeJS.Architecture;
    memoryUsage: NodeJS.MemoryUsage;
    uptime: number;
    userAgent?: undefined;
    language?: undefined;
    languages?: undefined;
    hardwareConcurrency?: undefined;
    deviceMemory?: undefined;
    screen?: undefined;
    window?: undefined;
    timezone?: undefined;
    online?: undefined;
    touchSupport?: undefined;
} | {
    environment: string;
    userAgent: string;
    platform: string;
    language: string;
    languages: readonly string[];
    hardwareConcurrency: number;
    deviceMemory: MediaDevices;
    screen: {
        width: number;
        height: number;
        availWidth: number;
        availHeight: number;
        colorDepth: number;
        pixelDepth: number;
    };
    window: {
        innerWidth: number;
        innerHeight: number;
        outerWidth: number;
        outerHeight: number;
    };
    timezone: string;
    online: boolean;
    touchSupport: {
        maxTouchPoints: number;
        touchEvent: boolean;
    };
    nodeVersion?: undefined;
    cpuArch?: undefined;
    memoryUsage?: undefined;
    uptime?: undefined;
};

declare function getIP(apiKey?: string): Promise<any>;

export { generateFingerprint, getDeviceInfo, getIP };
