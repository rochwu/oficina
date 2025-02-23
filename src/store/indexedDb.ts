import {untrack} from 'solid-js';
import {reconcile, unwrap, type SetStoreFunction} from 'solid-js/store';

const dbName = 'oficina';
const storeName = 'oficina';
const version = 1; // If we need to change schema, `onupgradeneeded` fires on version change, or when it's brand new

// Initialize IndexedDB
const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.error('💀 storage failed?!');
      reject(request.error);
    };
  });
};

// Generic function to interact with IndexedDB
const withDb = async <T>(
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> => {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const request = callback(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      console.error("😖 couldn't write to storage");
      reject(request.error);
    };
  });
};

export const createIndexedDb = (name: string) => {
  const get = () => {
    return withDb('readonly', (store) => store.get(name));
  };
  const set = (value: unknown) => {
    return withDb('readwrite', (store) => store.put(value, name));
  };
  const remove = () => {
    return withDb('readwrite', (store) => store.delete(name));
  };

  return {
    get,
    set,
    delete: remove,
  };
};

/**
 * Taking a lot of ideas from @solid-primitives/storage makePersisted
 *
 * The only reason I had to made this is cuz makePersisted serializes IndexedDB to string
 * IndexedDB takes objects much better
 */
export const persist = <T>(store: [get: T, set: SetStoreFunction<T>]) => {
  const [storeProxy, setStore] = store;

  const db = createIndexedDb('calendar');

  db.get().then((value) => {
    if (value) {
      /**
       * reconcile to merge value instead of straight up set
       */
      setStore(reconcile(value));
    }
  });

  const set = (...args: any[]) => {
    (setStore as any)(...args);

    /**
     * untrack makes `set` not a reactive signal
     * unwrap turns the proxy into a plain object
     */
    db.set(unwrap(untrack(() => storeProxy)));
  };

  return [storeProxy, set] as typeof store;
};
