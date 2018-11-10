import Room from './room.model'

export default class Rooms {
    constructor() {
        this.rooms = new Map()
    }

    join(roomName, socket) {
        const room = this.rooms.get(roomName) || new Room(roomName)
        room.add(socket)
        this.rooms.set(roomName, room)
    }

    remove(roomName, socket) {
        const room = this.rooms.get(roomName)
        if (room) {
            room.remove(socket)
            this.rooms.set(roomName, room)
        }
    }

    disconnect(socket) {
        this.rooms.forEach(c => c.remove(socket))
    }

    isJoined(roomName, socket) {
        if (this.rooms.get(roomName)) {
            return this.rooms.get(roomName).isExist(socket)
        }
        return false
    }

    getRoomByName(roomName) {
        return this.rooms.get(roomName)//.serialize();
    }

    getAll() {
        return Array.from(this.rooms.values()).map(c => c.serialize())
    }
}
