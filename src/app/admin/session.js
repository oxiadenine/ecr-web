import "server-only";

import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import SessionDatabase from "@/data/session-db";
import SessionKey from "@/lib/admin/session-key";

export default class Session {
  static new(key) {
    const sessionId = randomBytes(16).toHex();
    
    const hash = SessionKey.extractData(key).hash;
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
  
    SessionDatabase.create(session);
  
    return session;
  }

  static verify(encryptedSessionId, key) {
    const encryptedSession = SessionDatabase.read(encryptedSessionId);
  
    if (!encryptedSession) return false;
  
    const hash = SessionKey.extractData(key).hash;
  
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

  static revoke(encryptedSessionId) {
    SessionDatabase.delete(encryptedSessionId);
  }
}
