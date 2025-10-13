const {
  randomBytes,
  createHash,
  createCipheriv,
  createDecipheriv,
} = require("crypto");

const KEYONE = "OY8r1gZ2ZhjjDy3kPYT/OkCKlAiTTvHxC3Ynoep+woA=";
class CryptDecryptController {
  /**
   * Génère un UUID factice.
   * @returns {String} UUID factice généré
   */
  static generateFakeUuid() {
    const randomString = randomBytes(8).toString("hex");
    const md5Hash = CryptDecryptController.md5("fake_namespace" + randomString);
    const uuid = `${md5Hash.substr(0, 8)}-${md5Hash.substr(
      8,
      4
    )}-${md5Hash.substr(12, 4)}-${md5Hash.substr(16, 4)}-${md5Hash.substr(
      20,
      12
    )}`;
    return uuid;
  }

  /**
   * Crypte les données.
   * @param {any} data - Les données à crypter
   * @returns {String} Les données cryptées
   */
  static dataCrypt(data) {
    const firstKey = Buffer.from(KEYONE, "base64");
    const ivLength = 16;
    const iv = randomBytes(ivLength);

    const firstEncrypted = CryptDecryptController.aes256cbcEncrypt(
      data,
      firstKey,
      iv
    );
    const output = Buffer.concat([iv, firstEncrypted])
      .toString("base64")
      .replace(/\+/g, "[plus]");
    return output;
  }

  /**
   * Décrypte les données.
   * @param {String} input - Les données à décrypter
   * @returns {any} Les données décryptées ou un objet d'erreur
   */
  static dataDecrypt(input) {
    try {
      const cleanedInput = input.replace(/\[plus\]/g, "+");
      const firstKey = Buffer.from(KEYONE, "base64");
      const mix = Buffer.from(cleanedInput, "base64");
      const iv = mix.slice(0, 16);
      const firstEncrypted = mix.slice(16);
      const data = CryptDecryptController.aes256cbcDecrypt(
        firstEncrypted,
        firstKey,
        iv
      );
      return data;
    } catch (error) {
      return {
        message: `Error Line : ${error.lineNumber} ${error.message}`,
        code: 400,
      };
    }
  }

  /**
   * Génère la clé à crypter.
   * @returns {String} Clé générée
   */
  generateKey() {
    const key1 = randomBytes(64).toString("hex");
    const key2 = randomBytes(32).toString("hex");
    const fUuid1 = CryptDecryptController.generateFakeUuid().replace(/-/g, "");
    const fUuid2 = CryptDecryptController.generateFakeUuid().replace(/-/g, "");
    const fUuid3 = CryptDecryptController.generateFakeUuid().replace(/-/g, "");

    let maVariable = key1;
    let parts = maVariable.match(/.{1,14}/g);
    let lastPart = parts.pop();
    parts.splice(1, 0, lastPart);
    let nouvelleVariable = parts.join("");

    parts = nouvelleVariable.match(/.{1,21}/g);
    let key =
      parts[0] +
      fUuid1.substr(0, 4) +
      parts[1] +
      fUuid1.substr(4, 4) +
      parts[2] +
      fUuid1.substr(8, 4) +
      parts[3] +
      fUuid1.substr(12, 4) +
      parts[4];
    key = key.match(/.{1,32}/g);

    parts = key[0].match(/.{1,16}/g);
    key =
      parts[0] +
      fUuid2.substr(0, 6) +
      parts[1] +
      fUuid2.substr(6, 6) +
      parts[2] +
      fUuid2.substr(12, 4) +
      parts[3];

    parts = fUuid3.match(/.{1,16}/g);
    key = parts[0] + key + parts[1];

    return key;
  }

  /**
   * Fonction de hachage MD5
    @param {} data
   * @returns
   */
  static md5(data) {
    return createHash("md5").update(data).digest("hex");
  }

  /**
   * Fonction de chiffrement AES-256-CBC
    @param {} data
    @param {} key
    @param {} iv
   * @returns
   */
  static aes256cbcEncrypt(data, key, iv) {
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    return Buffer.from(encrypted, "base64");
  }

  /**
   * Fonction de déchiffrement AES-256-CBC
    @param {} ciphertext
    @param {} key
    @param {} iv
   * @returns
   */
  static aes256cbcDecrypt(encrypted, key, iv) {
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}

module.exports = CryptDecryptController;
