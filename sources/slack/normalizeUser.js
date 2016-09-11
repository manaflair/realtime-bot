import { isNil } from 'lodash';

export function normalizeUser(slackUser) {

    if (isNil(slackUser))
        return slackUser;

    return {

        id: slackUser[`id`],
        username: slackUser[`name`],

        realName: slackUser.profile[`real_name`],
        firstName: slackUser.profile[`first_name`],
        lastName: slackUser.profile[`last_name`],

        isAdmin: slackUser[`is_admin`],
        isOwner: slackUser[`is_owner`],
        isBot: slackUser[`is_bot`]

    };

}
