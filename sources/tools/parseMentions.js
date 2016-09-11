export function parseMentions(string) {

    let mentions = new Set();

    let header = (string.match(/^([\s:,]*<?@[A-Z0-9]+>?)*[\s:,]*/i) || [ `` ])[0];
    let text = header ? string.substr(header.length) : string;

    for (let mention of header.match(/@([A-Z0-9]+)/gi) || [])
        mentions.add(mention.replace(/^@/, ``));

    return { mentions, text };

}
