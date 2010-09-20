import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

import javax.crypto.BadPaddingException;

import org.junit.Test;

import junit.framework.TestCase;


public class encryptionTestCase extends TestCase {

	/**
	 * Key shorter than 8 bytes will be padded with 0s
	 * So 2nd and 3rd DES key will be 0, cancelling each other out
	 * and reducing 3DES algorithm to easily breakable DES
	 */
	@Test
	public void test_keyPaddingIsABadIdea() throws UnsupportedEncodingException, GeneralSecurityException {
		System.out.println(getName());
		// key shorter than 8 byte
		String shortKey = new String("abc123");

		Encryption e = new Encryption(shortKey);
		DESEncryption e2 = new DESEncryption(shortKey);

		byte[] plaintext = new String("plaintxt").getBytes("UTF8");
		dumpBytes("PLAINTEXT", plaintext);
		dumpBytes("3DES KEY", e.getKey());
		dumpBytes("3DES ENC", e.encrypt(plaintext));
		dumpBytes("DES KEY", e2.getKey());
		dumpBytes("DES ENC", e2.encrypt(plaintext));

		assertTrue(
				"[!] 3DES reduced to DES!",
				!Arrays.equals(e.encrypt(plaintext), e2.encrypt(plaintext))
		);
	}

	@Test
	public void test_leastSignificantBitsInKeyAreIgnored() throws UnsupportedEncodingException, GeneralSecurityException {
		System.out.println(getName());

		// the keys are differing in least significant bits only
		String key = new String("\u00ff\u0000");
		String secondKey = new String("\u00fe\u0001");
		Encryption e = new Encryption(key);
		Encryption e2 = new Encryption(secondKey);
		byte[] plaintext = new String("plaintxt").getBytes("UTF8");

		dumpBytes("KEY 1", e.getKey());
		dumpBytes("KEY 2", e2.getKey());
		dumpBytes("ENC 1", e.encrypt(plaintext));
		dumpBytes("ENC 2", e2.encrypt(plaintext));

		assertTrue(
				"[!] Least significant bytes are ignored!",
				!Arrays.equals(e.encrypt(plaintext), e2.encrypt(plaintext))
		);
	}

/*
	@Test
	public void test_ZeroIVIsTargetForAKnownCiphertextAttack() throws UnsupportedEncodingException, GeneralSecurityException {
		System.out.println(getName());

		DESEncryption e = new DESEncryption("I will never know this key");
		byte[] plaintext = "snakeOilIKNOWONLYFIRST8BYTES1234".getBytes("UTF8");
		byte[] step1 = e.encrypt(plaintext);

		dumpBytes("STEP1 DEC", plaintext);
		dumpBytes("STEP1 ENC", step1);

		// copy first block
		byte[] step2 = new byte[step1.length];
		System.arraycopy(step1, 0, step2, 0, step1.length);

		boolean ok = false;
		for (int i = 0; i < 256; i++) {
			step2[step2.length - 1] = (byte) i;
			try {
				e.decrypt(step2);
				ok = true;
				break;
			} catch(BadPaddingException ex) {
			}
		}

		assertTrue("Padding found", ok);
		dumpBytes("STEP2 ENC", step2);
		dumpBytes("STEP2 DEC", e.decrypt(step2));

	}
*/

	private static void dumpBytes(String name, byte[] bytes) {
		System.out.print(name + ":\t");
		for (int i = 0; i < bytes.length; i++) {

			if (i > 0 && (i % 8 == 0)) {
				System.out.print(" ");
			}

			System.out.printf("%02x", bytes[i]);
		}
		System.out.println();
	}

}
