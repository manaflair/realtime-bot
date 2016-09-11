import { isNil } from 'lodash';

export function normalizeChannel(slackChannel) {

    if (isNil(slackChannel))
        return slackChannel;

    return {

        id: slackChannel[`id`],
        name: slackChannel[`name`]

    };

}
