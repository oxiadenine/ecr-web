export default class SessionKey {
  static async generate(password) {
    const hash = await Bun.password.hash(password, {
      algorithm: "argon2id",
      memoryCost: 32000,
      timeCost: 8
    });
  
    return new TextEncoder().encode(hash).toHex();
  }

  static async verify(password, key) {
    const hash = new TextDecoder().decode(Uint8Array.fromHex(key));
  
    return await Bun.password.verify(password, hash);
  }

  static extractData(key) {
    const data = TextDecoder().decode(Uint8Array.fromHex(key)).split("$");
  
    return { 
      id: data[1], 
      version: data[2].split("=")[1], 
      params: data[3].split(",").reduce((o, p) => ({ 
        ...o, [p.split("=")[0]]: p.split("=")[1] 
      }), {}), 
      salt: data[4], 
      hash: data[5]
    };
  }
}
