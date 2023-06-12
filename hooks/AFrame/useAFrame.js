import { useSyncExternalStore } from 'react';

let AFrame = null;
let listeners = [];
export const AFrameStore = {
  insert(newAFrame) {
    AFrame = newAFrame;
    for (const listener of listeners) {
      listener();
    }
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return AFrame;
  },
  getServerSnapshot() {
    return null;
  }
};
export function useAFrame() {
  return useSyncExternalStore(AFrameStore.subscribe, AFrameStore.getSnapshot, AFrameStore.getServerSnapshot);
}
