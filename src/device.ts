export function getDeviceInfo() {
    if (typeof navigator === "undefined") {
        return { platform: process.platform, node: process.version };
    }

    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screen: {
            width: window.screen.width,
            height: window.screen.height,
        },
    };
}
