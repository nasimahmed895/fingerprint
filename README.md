# 🔐 unique-fingerprint

A lightweight utility to generate unique device fingerprints, gather device/browser information, and fetch IP + geolocation data.  
Works in both **client-side** and **server-side** environments.

---

## ✨ Features

- 🧠 Generate unique fingerprints (`generateFingerprint`)
- 🌐 Fetch IP and geolocation info (`getIP`) – supports optional IP-API Pro key
- 📱 Get device/browser info (`getDeviceInfo`) – client-side only

---

## 📦 Installation

```bash
npm install unique-fingerprint
# or
yarn add unique-fingerprint
```

---

## 📘 Usage

### 1. `generateFingerprint(length?: number)`

Generate a random fingerprint string.  
Length is optional (default: `32`).

```ts
import { generateFingerprint } from 'unique-fingerprint';

const fingerprint = generateFingerprint();       // 32-character fingerprint
const shortFingerprint = generateFingerprint(16); // Custom length
```

---

### 2. `getIP(apiKey?: string)`

Fetch IP address and geolocation details using [ip-api.com](https://ip-api.com).  
Supports optional **API key** for paid features (HTTPS, higher limits, better accuracy).

```ts
import { getIP } from 'unique-fingerprint';

// Without API key (free tier)
const ipInfo = await getIP();

// With API key (Pro account)
const ipInfoWithKey = await getIP('your-ip-api-key');

console.log(ipInfo);
```

✅ **Note:** Automatically switches between  
- `http://ip-api.com` (development)  
- `https://ip-api.com` (production)  
based on `NODE_ENV`.

---

### 3. `getDeviceInfo()`

Client-side function to collect basic browser/device information.

```ts
import { getDeviceInfo } from 'unique-fingerprint';

const device = getDeviceInfo();
console.log(device);
/*
{
    userAgent: "...",
    platform: "...",
    language: "...",
    screen: { width: ..., height: ... },
    timezone: "..."
}
*/
```

---

## 📌 Example Use Case

```ts
import {
  generateFingerprint,
  getDeviceInfo,
  getIP,
} from 'unique-fingerprint';

async function collectClientInfo() {
  const fingerprint = generateFingerprint();
  const deviceInfo = getDeviceInfo();
  const ipInfo = await getIP(); // or pass your API key

  return {
    fingerprint,
    deviceInfo,
    ipInfo,
  };
}
```

---

## 🔐 Optional: Using ip-api Pro API Key

If you're using a **paid ip-api.com key**, pass it like so:

```ts
const ipInfo = await getIP('your-pro-api-key');
```

---

## 📝 License

MIT © 2025  
