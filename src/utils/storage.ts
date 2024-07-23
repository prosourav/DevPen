class Storage {
  save<T>(key: string, value: T): void {
    console.log("called", value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  retrieve<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    if (json === null) {
      return null;
    }
    return JSON.parse(json) as T;
  }
}

export default new Storage();