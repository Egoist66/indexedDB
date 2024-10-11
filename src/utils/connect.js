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
                db.createObjectStore('users-storage', {
                    keyPath: 'email',
                })
            }
            else {
                console.log('Database already exists');
            }
          
        },
    });


    
    await openDB('notes', 2, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('notes-storage')) {
                db.createObjectStore('notes-storage', {
                    keyPath: 'id',
                    autoIncrement: true,
                })
            }
            else {
                console.log('Database already exists');
            }
          
        },
    });
  
}
