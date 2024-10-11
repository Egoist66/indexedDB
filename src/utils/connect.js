import {openDB} from './indexedDB+.js';


/**
 * Connects to the IndexedDB database, and creates it if it doesn't exist yet.
 * 
 * @returns {Promise<void>}
 */
export async function connect(){

    await openDB('users', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('users-storage')) {
                const store = db.createObjectStore('users-storage', {
                    keyPath: 'email',
                })
                console.log(store)
            }
            else {
                console.log('Database already exists');
            }
          
        },
    });


    
    await openDB('notes', 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('notes-storage')) {
                const store = db.createObjectStore('notes-storage', {
                    keyPath: 'id',
                    autoIncrement: true,
                })

               
                store.createIndex('title', 'title', {unique: false})
            }
            else {
               
                console.log('Database already exists');
            }
          
        },
    });
  
}
