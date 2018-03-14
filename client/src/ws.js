import socketio from 'socket.io-client';
const socket = socketio(process.env.REACT_APP_API_BASE_URL);

function subscribeForNewTags (cb) {
  socket.on('tagCreated', tag => cb(null, tag));
};

export { subscribeForNewTags };
