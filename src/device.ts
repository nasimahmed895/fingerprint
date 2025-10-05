export function getDeviceInfo() {
    if (typeof navigator === "undefined") {
        // Node.js environment
        return {
            environment: "node",
            platform: process.platform,
            nodeVersion: process.version,
            cpuArch: process.arch,
            memoryUsage: process.memoryUsage(),
            uptime: process.uptime(),
        };
    }

    // Browser environment
    return {
        environment: "browser",
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.mediaDevices || "unknown", // in GB (may not be supported)
        screen: {
            width: window.screen.width,
            height: window.screen.height,
            availWidth: window.screen.availWidth,
            availHeight: window.screen.availHeight,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
        },
        window: {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        online: navigator.onLine,
        touchSupport: {
            maxTouchPoints: navigator.maxTouchPoints,
            touchEvent: 'ontouchstart' in window,
        },
    };
}
