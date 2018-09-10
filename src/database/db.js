import Dexie from 'dexie';
import messages from './messages.json';
import choices from './choices.json';

const db = new Dexie('storyDb');
db.version(1).stores({
    messages: `id, content, nextMessageId, clear, prerequisite`,
    choices: `id, previousMessageId, content, nextMessageId, ordinal`,
    effects: `++id, name, value, gameId`
});
db.on("populate", function () {
    db.messages.bulkPut(messages);
    db.choices.bulkPut(choices);
});

export default db;