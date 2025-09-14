"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  compareFingerprint: () => compareFingerprint,
  deleteFingerprint: () => deleteFingerprint,
  generateFingerprint: () => generateFingerprint,
  getDeviceInfo: () => getDeviceInfo,
  getIP: () => getIP,
  getStoredFingerprint: () => getStoredFingerprint,
  isFingerprintValid: () => isFingerprintValid,
  logFingerprintData: () => logFingerprintData,
  storeFingerprint: () => storeFingerprint,
  updateFingerprint: () => updateFingerprint
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
