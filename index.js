const hapi = require('hapi');

//setup server
const conf = require('./conf.json');
const server = hapi.server(conf.serverConf);

//setup socket io
const io = require('socket.io')(server.listener);

const init = async () => {
    await server.start();

    const r = require('./routes/route.js')(io);
    console.log(`Server running at ${server.info.uri}`);
}

init();