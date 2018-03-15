import socketio from 'socket.io-client';
const socket = socketio(process.env.REACT_APP_API_BASE_URL);

function subscribeForNewTags (cb) {
  socket.on('tagCreated', tag => cb(null, tag));
};

function subscribeForUpdatedTags (cb) {
  socket.on('tagUpdated', tag => cb(null, tag));
};

function subscribeForDeletedTags (cb) {
  socket.on('tagDeleted', tag => cb(null, tag));
};

export {
  subscribeForNewTags,
  subscribeForUpdatedTags,
  subscribeForDeletedTags
};
