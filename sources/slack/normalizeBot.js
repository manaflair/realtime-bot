import { isNil } from 'lodash';

export function normalizeBot(slackBot) {

    if (isNil(slackBot))
        return slackBot;

    return {

        id: slackBot[`id`]

    };

}
