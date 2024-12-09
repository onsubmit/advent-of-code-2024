export class StringMap<K extends { toString: () => string }, V> {
  private _stringMap: Map<string, V>;

  constructor(map: Map<K, V> = new Map()) {
    this._stringMap = new Map<string, V>(
      [...map.entries()].map(([key, value]) => [key.toString(), value])
    );
  }

  get = (key: K): V | undefined => this._stringMap.get(key.toString());
  set = (key: K, value: V): Map<string, V> => {
    return this._stringMap.set(key.toString(), value);
  };
}
