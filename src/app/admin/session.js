import "server-only";

import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import { insertSession, selectSession, deleteSession } from "@/data/session-db";
import { extractSessionKeyData } from "@/lib/admin/session-key";

export function createSession(key) {
  const sessionId = randomBytes(16).toHex();
  
  const hash = extractSessionKeyData(key).hash;
  const iv = randomBytes(16);
  
  const cipher = createCipheriv("aes-256-gcm", Uint8Array.fromBase64(hash), iv);

  const encryptedSessionId = Buffer.concat([
    cipher.update(Uint8Array.fromHex(sessionId)), 
    cipher.final()
  ]);

  const authTag = cipher.getAuthTag();

  const session = { 
    id: encryptedSessionId.toHex(), 
    iv: iv.toHex(), 
    authTag: authTag.toHex() 
  };

  insertSession(session);

  return session;
}

export function verifySession(encryptedSessionId, key) {
  const encryptedSession = selectSession(encryptedSessionId);

  if (!encryptedSession) return false;

  const hash = extractSessionKeyData(key).hash;

  const decipher = createDecipheriv(
    "aes-256-gcm", 
    Uint8Array.fromBase64(hash), 
    Uint8Array.fromHex(encryptedSession.iv)
  );
  decipher.setAuthTag(Uint8Array.fromHex(encryptedSession.authTag));

  try {
    Buffer.concat([
      decipher.update(Uint8Array.fromHex(encryptedSession.id)), 
      decipher.final()
    ]);
  } catch (error) {
    return false;
  }

  return true;
}

export function revokeSession(sessionId) {
  deleteSession(sessionId);
}
