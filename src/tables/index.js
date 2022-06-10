export class HashTable {
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = hash + key.charCodeAt(i);
    }
    return hash;
  }

  set(key, value) {
    const position = this._hash(key);
    if (!this.data[position]) {
      this.data[position] = [key, value];
    } else {
      if (Array.isArray(this.data[position][0])) {
        this.data[position].push([key, value]);
      } else {
        let temp = this.data[position];
        this.data[position] = [];
        this.data[position].push(temp);
        this.data[position].push([key, value]);
      }
    }
    this.size++;
  }

  get(key) {
    const position = this._hash(key);
    return this.data[position];
  }
}
