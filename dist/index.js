// src/device.ts
function getDeviceInfo() {
  if (typeof navigator === "undefined") {
    return { platform: process.platform, node: process.version };
  }
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height
    }
  };
}

// src/ip.ts
async function getIP() {
  if (typeof fetch === "undefined") return null;
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch {
    return null;
  }
}

// src/storage.ts
function setStorage(key, value) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, value);
      document.cookie = `${key}=${value}; path=/; max-age=31536000`;
    } catch {
    }
  } else {
    globalThis[key] = value;
  }
}
function getStorage(key) {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(key) || null;
    } catch {
      return null;
    }
  } else {
    return globalThis[key] || null;
  }
}
function deleteStorage(key) {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
      document.cookie = `${key}=; Max-Age=0`;
    } catch {
    }
  } else {
    delete globalThis[key];
  }
}

// src/core.ts
var DEFAULT_KEY = process.env.FP_COOKIE_KEY || "fp_id";
function generateFingerprint(length = 32) {
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
async function storeFingerprint(id) {
  return setStorage(DEFAULT_KEY, id);
}
function getStoredFingerprint() {
  return getStorage(DEFAULT_KEY);
}
function deleteFingerprint() {
  deleteStorage(DEFAULT_KEY);
}
function compareFingerprint(id) {
  const stored = getStoredFingerprint();
  return stored === id;
}
function isFingerprintValid(id) {
  return typeof id === "string" && id.length > 0;
}
async function logFingerprintData() {
  return {
    fingerprint: getStoredFingerprint(),
    device: getDeviceInfo(),
    ip: await getIP()
  };
}
async function updateFingerprint() {
  const newId = generateFingerprint();
  await storeFingerprint(newId);
  return newId;
}
export {
  compareFingerprint,
  deleteFingerprint,
  generateFingerprint,
  getDeviceInfo,
  getIP,
  getStoredFingerprint,
  isFingerprintValid,
  logFingerprintData,
  storeFingerprint,
  updateFingerprint
};
