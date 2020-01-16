export default class Room {
    constructor(name) {
        this.name = name
        this.members = new Map()
    }

    add(socket) {
        this.members.set(socket.id, socket)
        const action = {
            type: 'ROOM.STATE',
            payload: this.serialize()
        }
        this.members.forEach(m => m.emit(this.name, action))
        // socket.emit('server-send-data', action);
        // socket.to(this.name).emit('server-send-data', action);
    }

    remove(socket) {
        this.members.delete(socket.id)
        const action = {
            type: 'ROOM.STATE',
            payload: this.serialize()
        }
        this.members.forEach(m => m.emit(this.name, action))
        // socket.emit('server-send-data', action);
        // socket.to(this.name).emit('server-send-data', action);
    }

    isExist({ id, userId }) {
        if (id) return this.members.get(id)
        if (userId) return Array.from(this.members.values()).find(i => `${i.userId}` === `${userId}`)
        return null
    }

    serialize() {
        return {
            room: this.name,
            members: Array.from(this.members.values()).map(i => ({ userId: i.userId, id: i.id }))
        }
    }

    broadcastEmit(data) {
        this.members.forEach(m => m.to(this.name).emit('server-send-data', data))
    }
}
