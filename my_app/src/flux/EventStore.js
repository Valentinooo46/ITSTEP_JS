import { AppDispatcher } from './dispatcher';
import { EventActionTypes } from './EventActions';
import { initialEvents } from '../data/eventsData';

// Примітивний EventEmitter
class Emitter {
  constructor() { this.listeners = new Set(); }
  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit() { for (const fn of this.listeners) fn(); }
}

class EventStoreClass {
  constructor() {
    this._state = {
      entities: initialEvents,
      favorites: [],
      categoryFilter: 'Усі'
    };
    this._emitter = new Emitter();

    this._dispatchToken = AppDispatcher.register(this._onDispatch.bind(this));
  }

  // Selectors
  getAll() { return this._state.entities; }
  getFavorites() { return this._state.favorites; }
  getCategoryFilter() { return this._state.categoryFilter; }
  getById(id) { return this._state.entities.find(e => e.id === id); }

  // Subscription
  addChangeListener(fn) { return this._emitter.on(fn); }

  // Internal reducer-like handler
  _onDispatch(action) {
    switch (action.type) {
      case EventActionTypes.SET_CATEGORY_FILTER: {
        this._state.categoryFilter = action.payload;
        this._emitter.emit();
        break;
      }
      case EventActionTypes.ADD_FAVORITE: {
        const id = action.payload;
        if (!this._state.favorites.includes(id)) {
          this._state.favorites = [...this._state.favorites, id];
          this._emitter.emit();
        }
        break;
      }
      case EventActionTypes.REMOVE_FAVORITE: {
        const id = action.payload;
        this._state.favorites = this._state.favorites.filter(fid => fid !== id);
        this._emitter.emit();
        break;
      }
      default:
        // ignore
    }
  }
}

export const EventStore = new EventStoreClass();