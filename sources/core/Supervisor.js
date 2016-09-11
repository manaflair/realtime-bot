import EventEmitter from 'eventemitter3';

export class Supervisor extends EventEmitter {

    constructor() {

        super();

        this.adapters = new Map();

    }

    addAdapter(adapter) {

        this.adapters.set(adapter.getName(), adapter);

        adapter.on(`bot`, bot => {
            this.emit(`bot`, bot);
        });

    }

    join(instance) {

        if (!this.adapters.has(instance.adapter))
            return;

        this.adapters.get(instance.adapter).join(instance);

    }

    send(instance, message) {

        if (!this.adapters.has(instance.adapter))
            return;

        this.adapters.get(instance.adapter).send(instance, message);

    }

}
