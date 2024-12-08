export class StringSet<V extends { toString: () => string }> {
  private _stringMap: Map<string, V>;

  constructor(set: Set<V> = new Set()) {
    this._stringMap = new Map([...set.values()].map((v) => [v.toString(), v]));
  }

  get size(): number {
    return this._stringMap.size;
  }

  [Symbol.iterator]() {
    return this._stringMap.values();
  }

  has = (value: V): boolean => this._stringMap.has(value.toString());
  add = (value: V): Map<string, V> => this._stringMap.set(value.toString(), value);
}
