export class FilterVideo {

    _value: string;

    constructor(value: string) {
        this._value = value;
    }

    get value(): string { return this._value.toLocaleLowerCase() }
}