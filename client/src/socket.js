const io = require("socket.io-client");

export default function() {
  const socket = io.connect("http://localhost:5001");

  /*   function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived)
  }
 */
  socket.on("connect", () => {
    console.log('connected to socket')
  });

  socket.on("error", function(err) {
    console.log("received socket error:");
    console.log(err);
  });
    
  function updateVacation() {
    socket.emit('updateVacationsRequest', {msg:'hello'})
  }

    return {
      socket,
    updateVacation,
  };
}
