const EventBus = {
  listeners: {} as Record<string, Array<(data: any) => Promise<void> | void>>,

  subscribe: (event: string, callback: (data: any) => Promise<void> | void) => {
    if (!EventBus.listeners[event]) {
      EventBus.listeners[event] = [];
    }
    EventBus.listeners[event].push(callback);
  },

  unsubscribe: (event: string, callback: (data: any) => Promise<void> | void) => {
    if (EventBus.listeners[event]) {
      EventBus.listeners[event] = EventBus.listeners[event].filter((listener) => listener !== callback);
    }
  },

  publish: (event: string, data: any) => {
    if (EventBus.listeners[event]) {
      const promises = EventBus.listeners[event].map((callback) => callback(data));
      return Promise.all(promises);
    }
    return Promise.resolve();
  },
};

export default EventBus;
