import EventEmitter from 'eventemitter3';

export class Adapter extends EventEmitter {

    constructor() {

        super();

        this.instances = new Map();

    }

    getName() {

        throw new Error(`A golurk adapter should override the getName() method`);

    }

    makeBot(parameters) {

        throw new Error(`A golurk adapter should override the makeBot() method`);

    }

    join(instance) {

        if (!this.instances.has(instance.botId)) {

            let bot = this.makeBot(instance);
            this.instances.set(instance.botId, bot);

            this.emit(`bot`, bot);
            bot.startListening();

            return bot;

        } else {

            return this.instances.get(instance.botId);

        }

    }

    send(instance, message) {

        let bot = this.instances.has(instance.botId)
            ? this.instances.get(instance.botId)
            : this.makeBot(instance);

        bot.send(message);

    }

}
