import app from './src/app';
import http from 'http';
import { debug } from 'console';
import dotenv from 'dotenv';

dotenv.config();

const normalizePort = (val: string) => {
    const _port = parseInt(val, 10);

    if (isNaN(_port)) {
        // named pipe
        return val;
    }

    if (_port >= 0) {
        // port number
        return _port;
    }

    return false;
};

const onError = (error: { syscall: string; code: any; }) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);