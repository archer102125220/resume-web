import { useSyncExternalStore } from 'react';

let AFrame = null;
let listeners = [];
export const AFrameStatus = {
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
  return useSyncExternalStore(AFrameStatus.subscribe, AFrameStatus.getSnapshot, AFrameStatus.getServerSnapshot);
}
