import Dexie from 'dexie';
import messages from './messages.js';
import choices from './choices.js';

const db = new Dexie('storyDb');
db.version(1).stores({
    messages: `id, content, nextMessageId, clear, prerequisites`,
    choices: `id, previousMessageId, content, nextMessageId, ordinal, effects, prerequisites`,
    effects: `++id, name, value, gameId`
});

db.on("populate", () => {
    db.messages.bulkPut(messages);
    db.choices.bulkPut(choices);
});

export default db;