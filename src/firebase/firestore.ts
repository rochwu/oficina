import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';

import {app} from './app';

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(
    /*settings*/ {tabManager: persistentMultipleTabManager()},
  ),
});
