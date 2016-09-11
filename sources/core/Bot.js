import EventEmitter from 'eventemitter3';
import { isNull }   from 'lodash';

export class Bot extends EventEmitter {

    constructor() {

        super();

        this.messageBuffer = [];

    }

    startBuffering() {

        this.messageBuffer = [];

    }

    flushMessageBuffer() {

        let messages = this.messageBuffer;
        this.messageBuffer = null;

        if (isNull(messages))
            return;

        for (let message of messages) {
            this.sendUnbuffered(message);
        }

    }

    send(message) {

        if (!isNull(this.messageBuffer)) {
            this.messageBuffer.push(message);
        } else {
            this.sendUnbuffered(message);
        }

    }

    sendUnbuffered() {

        throw new Error(`A golurk bot should override the sendUnbuffered() method`);

    }

}
