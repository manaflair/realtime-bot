import { Adapter }  from '../core/Adapter';

import { SlackBot } from './SlackBot';

export class SlackAdapter extends Adapter {

    getName() {

        return `slack`;

    }

    makeBot(parameters) {

        return new SlackBot(parameters);

    }

}
