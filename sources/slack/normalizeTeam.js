import { isNil } from 'lodash';

export function normalizeTeam(slackTeam) {

    if (isNil(slackTeam))
        return slackTeam;

    return {

        id: slackTeam[`id`]

    };

}
