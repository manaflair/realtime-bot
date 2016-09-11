import { RtmClient, WebClient, CLIENT_EVENTS, RTM_EVENTS } from '@slack/client';
import { isNil }                                           from 'lodash';

import { Bot }                                             from '../core/Bot';
import { parseMentions }                                   from '../tools/parseMentions';

import { SlackMessage }                                    from './SlackMessage';

export class SlackBot extends Bot {

    constructor({ adapter, botId, botToken }) {

        super(arguments[0]);

        this.id = botId;
        this.adapter = adapter;

        this.rtm = new RtmClient(botToken);
        this.web = new WebClient(botToken);

        this.rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, () => {

            this.flushMessageBuffer();

        });

        this.rtm.on(CLIENT_EVENTS.RTM.WS_CLOSE, () => {

            this.startBuffering();

        });

        this.rtm.on(RTM_EVENTS.MESSAGE, message => {

            if (!message.user)
                return;

            if (message.channel) {

                let { mentions, text } = parseMentions(message.text);

                if (mentions.has(botId)) {
                    this.emit(`msg.mention`, new SlackMessage(this, this.rtm.dataStore, Object.assign(message, { mentions, text })));
                } else {
                    this.emit(`msg.ambient`, new SlackMessage(this, this.rtm.dataStore, Object.assign(message, { mentions, text })));
                }

            } else {

                let { mentions, text } = parseMentions(message.text);

                this.emit(`msg.direct`, new SlackMessage(this, this.rtm.dataStore, Object.assign(message, { mentions, text })));

            }

        });

    }

    startListening() {

        this.rtm.start();

    }

    stopListening() {

        this.rtm.disconnect();

    }

    sendUnbuffered(data) {

        if (isNil(data))
            return;

        let { target, text = ` `, ... rest } = data;
        this.web.chat.postMessage(target, text, rest);

    }

}
