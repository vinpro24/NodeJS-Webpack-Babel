export default class Socket {
    constructor() {
        this.sockets = new Map();
    }

    add(socket) {
        this.sockets.set(socket.id, socket);
    }

    remove(socket) {
        this.sockets.delete(socket.id);
    }

    size() {
        return this.sockets.size;
    }

    isExist({ id, userId }) {
        if (id) return !!this.sockets.get(id);
        if (userId) return !!Array.from(this.sockets.values()).find(i => `${i.userId}` === `${userId}`);
        return false;
    }

    getSocket({ id, userId }) {
        if (id) return this.sockets.get(id);
        if (userId) return Array.from(this.sockets.values()).find(i => `${i.userId}` === `${userId}`);
        return null;
    }


    onTimeout(timeout, callback) {
        let called = false;
        if (typeof timeout === 'function') {
            callback = timeout;
            timeout = 10 * 1000;
        }
        const interval = setTimeout(() => {
            if (called) return;
            called = true;
            callback('Timeout connection!');
        }, timeout);
        return () => {
            if (called) return;
            called = true;
            clearTimeout(interval);
            callback();
        };
    };

}
