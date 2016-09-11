import { decorate }         from 'core-decorators';
import { isNil, memoize }   from 'lodash';

import { Message }          from '../core/Message';

import { normalizeBot }     from './normalizeBot';
import { normalizeChannel } from './normalizeChannel';
import { normalizeTeam }    from './normalizeTeam';
import { normalizeUser }    from './normalizeUser';

export class SlackMessage extends Message {

    constructor(bot, dataStore, data) {

        super();

        Object.defineProperties(this, {

            bot: { value: bot },

            dataStore: { value: dataStore },
            data: { value: data }

        });

    }

    @decorate(memoize)
    getTeam() {

        if (isNil(this.data.team))
            return null;

        return normalizeTeam(this.dataStore.getTeamById(this.data.team));

    }

    @decorate(memoize)
    getChannel() {

        if (isNil(this.data.channel))
            return null;

        return normalizeChannel(this.dataStore.getChannelGroupOrDMById(this.data.channel));

    }

    @decorate(memoize)
    getAuthor() {

        if (isNil(this.data.user))
            return null;

        return normalizeUser(this.dataStore.getUserById(this.data.user));

    }

    @decorate(memoize)
    getMentions() {

        return Array.from(this.data.mentions).map(mention => {
            return normalizeUser(this.dataStore.getUserById(mention));
        }).filter(user => {
            return !isNil(user);
        });

    }

    @decorate(memoize)
    getText() {

        return this.data.text;

    }

    reply(message) {

        if (isNil(message))
            return;

        let target = this.data.channel || this.data.user;

        this.bot.send(Object.assign({}, message, { target }));

    }

}
