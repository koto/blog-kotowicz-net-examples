import java.util.Arrays;


public class EncryptionTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		try {

			// vuln #1: short keys & padding
			String shortKey = new String("abc123");

			Encryption e = new Encryption(shortKey);
			DESEncryption e2 = new DESEncryption(shortKey);

			byte[] plaintext = new String("plaintxt").getBytes("UTF8");
			dumpBytes("PLAINTEXT", plaintext);
			dumpBytes("3DES KEY", e.getKey());
			dumpBytes("3DES ENC", e.encrypt(plaintext));
			dumpBytes("DES KEY", e2.getKey());
			dumpBytes("DES ENC", e2.encrypt(plaintext));

			if (Arrays.equals(e.encrypt(plaintext), e2.encrypt(plaintext))) {
				System.out.println("[!] 3DES reduced to DES!");
			}

			// vuln #2:

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

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
