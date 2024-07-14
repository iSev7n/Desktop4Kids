export class StorageManager {
	static MAX_BYTES = 5_000_000;

	static store(key: string, value: string) {
		if (key == null || value == null)
			return;

		const exceededMaxStorage = this.getByteSize(value) > this.MAX_BYTES;

		if (exceededMaxStorage)
			throw new Error("Failed to store value: storage capacity exceeded.");

		localStorage.setItem(key, value);
	}

	static load(key: string): string | null {
		if (key == null)
			return null;
		
		return localStorage.getItem(key);
	}

	static clear() {
		localStorage.clear();
	}

	static getByteSize(string: string | null): number {
		if (string == null) return 0;
		return new Blob([string]).size;
	}

	static byteToKilobyte(bytes: number): number {
		return bytes / 1000;
	}
}