import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;

import javax.crypto.Cipher;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * Helper class for encrypting and decrypting payloads using arbitrary string passphrases.
 *
 * @author rdamazio
 */
public class Encryption {

  public static int MAX_KEY_LENGTH = DESedeKeySpec.DES_EDE_KEY_LEN;
  private static String ENCRYPTION_KEY_TYPE = "DESede";
  private static String ENCRYPTION_ALGORITHM = "DESede/CBC/PKCS5Padding";
  private final SecretKeySpec keySpec;

  public Encryption(String passphrase) {
    byte[] key;
    try {
      key = passphrase.getBytes("UTF8");
    } catch (UnsupportedEncodingException e) {
      throw new IllegalArgumentException(e);
    }

    key = padKeyToLength(key, MAX_KEY_LENGTH);
    keySpec = new SecretKeySpec(key, ENCRYPTION_KEY_TYPE);
  }

  public byte[] getKey() {
	  return keySpec.getEncoded();
  }

  private byte[] padKeyToLength(byte[] key, int len) {
    byte[] newKey = new byte[len];
    System.arraycopy(key, 0, newKey, 0, Math.min(key.length, len));
    return newKey;
  }

  public byte[] encrypt(byte[] unencrypted) throws GeneralSecurityException {
    return doCipher(unencrypted, Cipher.ENCRYPT_MODE);
  }

  public byte[] decrypt(byte[] encrypted) throws GeneralSecurityException {
    return doCipher(encrypted, Cipher.DECRYPT_MODE);
  }

  private byte[] doCipher(byte[] original, int mode) throws GeneralSecurityException {
    Cipher cipher = Cipher.getInstance(ENCRYPTION_ALGORITHM);
    IvParameterSpec iv = new IvParameterSpec(new byte[] { 0, 0, 0, 0, 0, 0, 0, 0 });
    cipher.init(mode, keySpec, iv);
    return cipher.doFinal(original);
  }
}
