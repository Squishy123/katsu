exports = module.exports = function (io) {
    io.sockets.on('connection', function (socket) {
        socket.on('/api', () => { return io.emit('/api', "Hello World!") });
    })
}