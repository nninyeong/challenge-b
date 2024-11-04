type EventCallback = (data: string | null) => Promise<void> | void;

const EventBus = {
  listeners: {} as Record<string, EventCallback[]>,

  subscribe: (event: string, callback: EventCallback) => {
    if (!EventBus.listeners[event]) {
      EventBus.listeners[event] = [];
    }
    EventBus.listeners[event].push(callback);
  },

  unsubscribe: (event: string, callback: EventCallback) => {
    if (EventBus.listeners[event]) {
      EventBus.listeners[event] = EventBus.listeners[event].filter((listener) => listener !== callback);
    }
  },

  publish: (event: string, data: string | null) => {
    if (EventBus.listeners[event]) {
      const promises = EventBus.listeners[event].map((callback) => callback(data));
      return Promise.all(promises);
    }
    return Promise.resolve();
  },
};

export default EventBus;
