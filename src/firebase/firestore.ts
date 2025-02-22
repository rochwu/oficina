import {app} from './app';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ {tabManager: persistentMultipleTabManager()},
  ),
});
