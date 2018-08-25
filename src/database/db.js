import Dexie from 'dexie';
import messages from './messages.json';
import choices from './choices.json';

const db = new Dexie('storyDb');
db.version(1).stores({
    messages: `id, content, nextMessageId`,
    choices: `id, previousMessageId, content, nextMessageId`
});
db.messages.bulkPut(messages);
db.choices.bulkPut(choices);

export default db;