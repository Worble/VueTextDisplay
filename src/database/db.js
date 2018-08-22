import Dexie from 'dexie';
import messages from './messages.json';

console.log(messages);
const db = new Dexie('storyDb');
db.version(1).stores({
    messages: `id, content, nextMessageId`,
    choices: `id, previousMessageId, content, nextMessageId`
});
db.messages.bulkPut(messages);
db.messages.bulkPut();

export default db;