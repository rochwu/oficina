const dbName = 'oficina';
const storeName = 'calendar';

// Initialize IndexedDB
const openDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
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
    request.onerror = () => reject(request.error);
  });
};

// IndexedDB Async Storage
export const indexDb = {
  getItem: (key: string) => withDb('readonly', (store) => store.get(key)),
  setItem: (key: string, value: string) =>
    withDb('readwrite', (store) => store.put(value, key)),
  removeItem: (key: string) =>
    withDb('readwrite', (store) => store.delete(key)),
};
