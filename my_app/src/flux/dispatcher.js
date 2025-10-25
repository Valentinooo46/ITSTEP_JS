// Простіший власний Dispatcher (без бібліотек)
class Dispatcher {
  constructor() {
    this._callbacks = new Map();
    this._lastId = 1;
  }
  register(callback) {
    const id = String(this._lastId++);
    this._callbacks.set(id, callback);
    return id;
  }
  unregister(id) {
    this._callbacks.delete(id);
  }
  dispatch(action) {
    for (const cb of this._callbacks.values()) {
      cb(action);
    }
  }
}

export const AppDispatcher = new Dispatcher();