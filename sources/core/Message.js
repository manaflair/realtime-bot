import { capitalize, isFunction } from 'lodash';

export class Message {

    constructor() {

        let memberNames = new Set();

        for (let obj = Object.getPrototypeOf(this); obj; obj = Object.getPrototypeOf(obj))
            for (let name of Object.getOwnPropertyNames(obj))
                memberNames.add(name);

        for (let name of memberNames) {

            if (!name.match(/^get[A-Z]/))
                continue;

            if (!isFunction(this[name]))
                continue;

            let propertyName = name.replace(/^get([A-Z])/, ($0, $1) => $1.toLowerCase());

            Object.defineProperty(this, propertyName, {
                get() { return this[name]() },
                enumerable: true
            });

        }

    }

}
