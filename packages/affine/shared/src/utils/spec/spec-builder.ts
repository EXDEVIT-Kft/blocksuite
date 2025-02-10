import type { ExtensionType } from '@algogrind/block-std';

export class SpecBuilder {
  private _value: ExtensionType[];

  get value() {
    return this._value;
  }

  constructor(spec: ExtensionType[]) {
    this._value = [...spec];
  }

  extend(extensions: ExtensionType[]) {
    this._value = [...this._value, ...extensions];
  }
}
