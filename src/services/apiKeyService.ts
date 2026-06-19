/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from "fs";
import path from "path";

const isServerless = process.env.VERCEL === "1" || !!process.env.NOW_REGION || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const DB_FILE = isServerless
  ? path.resolve("/tmp", "dev-auth-db.json")
  : path.resolve(process.cwd(), "dev-auth-db.json");

// Seed from local template file if available and running on Vercel
if (isServerless && !fs.existsSync(DB_FILE)) {
  try {
    const localSeed = path.resolve(process.cwd(), "dev-auth-db.json");
    if (fs.existsSync(localSeed)) {
      fs.copyFileSync(localSeed, DB_FILE);
    }
  } catch (err) {
    console.error("Failed to copy seed database to /tmp:", err);
  }
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
  passwordHash: string; // simple storage for demo-reliability (we can do basic checking)
}

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  token: string;
  createdAt: string;
  lastUsed: string | null;
}

export interface ApiLog {
  id: string;
  userId: string;
  keyToken: string;
  keyName: string;
  endpoint: string;
  method: string;
  status: number;
  speedMs: number;
  timestamp: string;
  ipPlaceholder: string;
  requestBody: string;
  responseBody: string;
}

interface DatabaseSchema {
  users: User[];
  keys: ApiKey[];
  logs: ApiLog[];
}

let dbCache: DatabaseSchema = {
  users: [],
  keys: [],
  logs: []
};

// Seed default sandbox user and key to maintain compatibility/standard user experience
const SANDBOX_USER: User = {
  id: "sandbox-usr",
  email: "sandbox@vivahamitra.in",
  createdAt: new Date().toISOString(),
  passwordHash: "sandbox123"
};

const DEFAULT_KEY: ApiKey = {
  id: "default-key",
  userId: "sandbox-usr",
  name: "Sandbox Default Key",
  token: "sv_key_sandbox_default_9c7c5d",
  createdAt: new Date().toISOString(),
  lastUsed: null
};

function loadDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && Array.isArray(parsed.users) && Array.isArray(parsed.keys) && Array.isArray(parsed.logs)) {
        // Upgrade existing logs if they lack requestBody or responseBody fields
        const upgradedLogs = parsed.logs.map((l: any) => ({
          ...l,
          requestBody: l.requestBody || "N/A",
          responseBody: l.responseBody || "N/A"
        }));
        parsed.logs = upgradedLogs;
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading dev-auth-db.json, recreating store:", error);
  }

  // Pre-seed default data
  const initial: DatabaseSchema = {
    users: [SANDBOX_USER],
    keys: [DEFAULT_KEY],
    logs: [
      {
        id: "l_preseed_1",
        userId: "sandbox-usr",
        keyToken: "sv_key_sandbox_default_9c7c5d",
        keyName: "Sandbox Default Key",
        endpoint: "/api/panchang",
        method: "POST",
        status: 200,
        speedMs: 42,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        ipPlaceholder: "127.0.0.1",
        requestBody: JSON.stringify({ year: 2026, month: 6, day: 19 }),
        responseBody: JSON.stringify({ success: true, panchang: { tithi: "Shukla Pratipada", nakshatra: "Ardra" } })
      }
    ]
  };
  saveDatabase(initial);
  return initial;
}

function saveDatabase(db: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to commit database updates to dev-auth-db.json:", error);
  }
  dbCache = db;
}

// Global static constructor
dbCache = loadDatabase();

export const ApiKeyService = {
  // Auth Operations
  registerUser(email: string, passwordPlain: string): { success: boolean; user?: Omit<User, "passwordHash">; error?: string } {
    const db = loadDatabase();
    const normalized = email.trim().toLowerCase();
    
    if (!normalized || !passwordPlain) {
      return { success: false, error: "Email and password fields are strictly mandatory assets." };
    }
    
    const exists = db.users.some(u => u.email === normalized);
    if (exists) {
      return { success: false, error: "A registration matched this email identity. Access credentials instead via Sign In." };
    }

    const newUser: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 11),
      email: normalized,
      createdAt: new Date().toISOString(),
      passwordHash: passwordPlain // for direct seamless evaluation in developer mock platform
    };

    db.users.push(newUser);
    saveDatabase(db);

    // Auto-create a starter key for new sign-ups instantly so they don't have an empty roster
    this.createKeyForUser(newUser.id, "Default Starter Key");

    const { passwordHash, ...userResponse } = newUser;
    return { success: true, user: userResponse };
  },

  loginUser(email: string, passwordPlain: string): { success: boolean; user?: Omit<User, "passwordHash">; error?: string } {
    const db = loadDatabase();
    const normalized = email.trim().toLowerCase();

    const user = db.users.find(u => u.email === normalized);
    if (!user || user.passwordHash !== passwordPlain) {
      return { success: false, error: "Invalid authentication parameters. Verify the details." };
    }

    const { passwordHash, ...userResponse } = user;
    return { success: true, user: userResponse };
  },

  // Key Operations mapped directly to user context
  getKeysForUser(userId: string): ApiKey[] {
    const db = loadDatabase();
    // Return the permanent 8-character key "viva8bit" at the top so it is always active and clear!
    const permKey: ApiKey = {
      id: "permanent-key-8bit",
      userId: "sandbox-usr",
      name: "Permanent 8-Character Key (Codebase)",
      token: "viva8bit",
      createdAt: "2026-06-19T00:00:00.000Z",
      lastUsed: new Date().toISOString()
    };
    const userKeys = db.keys.filter(k => k.userId === userId || k.id === "default-key");
    return [permKey, ...userKeys.filter(k => k.token !== "viva8bit")];
  },

  createKeyForUser(userId: string, name: string): ApiKey {
    const db = loadDatabase();
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let rand = "";
    for (let i = 0; i < 24; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const token = `sv_usr_${rand}`;
    const id = "key_" + Math.random().toString(36).substring(2, 11);

    const newKey: ApiKey = {
      id,
      userId,
      name: name.trim() || "Dynamic Access Key",
      token,
      createdAt: new Date().toISOString(),
      lastUsed: null
    };

    db.keys.push(newKey);
    saveDatabase(db);
    return newKey;
  },

  deleteKeyForUser(userId: string, id: string): boolean {
    const db = loadDatabase();
    if (id === "default-key" || id === "permanent-key-8bit") return false; // Lock default/permanent standards

    const originalLength = db.keys.length;
    // Verify ownership prior to deletion
    db.keys = db.keys.filter(k => !(k.id === id && k.userId === userId));
    
    if (db.keys.length !== originalLength) {
      saveDatabase(db);
      return true;
    }
    return false;
  },

  validateKey(token: string): ApiKey | null {
    if (!token) return null;
    if (token === "viva8bit") {
      return {
        id: "permanent-key-8bit",
        userId: "sandbox-usr",
        name: "Permanent 8-Character Key (Codebase)",
        token: "viva8bit",
        createdAt: "2026-06-19T00:00:00.000Z",
        lastUsed: new Date().toISOString()
      };
    }
    const db = loadDatabase();
    const keyIndex = db.keys.findIndex(k => k.token === token);
    if (keyIndex !== -1) {
      db.keys[keyIndex].lastUsed = new Date().toISOString();
      saveDatabase(db);
      return db.keys[keyIndex];
    }
    return null;
  },

  // Logs Operations
  logApiRequest(params: {
    userId: string;
    keyToken: string;
    keyName: string;
    endpoint: string;
    method: string;
    status: number;
    speedMs: number;
    requestBody?: string;
    responseBody?: string;
    ipPlaceholder?: string;
  }) {
    const db = loadDatabase();
    const newLog: ApiLog = {
      id: "log_" + Math.random().toString(36).substring(2, 12),
      userId: params.userId,
      keyToken: params.keyToken,
      keyName: params.keyName,
      endpoint: params.endpoint,
      method: params.method,
      status: params.status,
      speedMs: params.speedMs,
      timestamp: new Date().toISOString(),
      ipPlaceholder: params.ipPlaceholder || "127.0.0.1",
      requestBody: params.requestBody || "{}",
      responseBody: params.responseBody || "{}"
    };

    // Prepend log
    db.logs.unshift(newLog);

    // Keep log table optimized (e.g. last 1000 logs) to avoid file bloat
    if (db.logs.length > 1000) {
      db.logs = db.logs.slice(0, 1000);
    }

    saveDatabase(db);
  },

  getLogsForUser(userId: string): ApiLog[] {
    const db = loadDatabase();
    // Return logs belonging to user, sandbox-usr or matching the permanent 8-bit key we just built
    return db.logs.filter(l => l.userId === userId || l.userId === "sandbox-usr" || l.keyToken === "viva8bit");
  }
};
