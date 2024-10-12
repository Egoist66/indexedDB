import {openDB} from '../lib/indexedDB+.js';


/**
 * Connects to the IndexedDB database, and creates it if it doesn't exist yet.
 * 
 * @returns {Promise<void>}
 */
export async function connect(){

    const usersDB =  await openDB('users', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('users-storage')) {
                const store = db.createObjectStore('users-storage', {
                    keyPath: 'email',
                    unique: true
                })
                
            }
            else {
                console.log('Database already exists');
            }
          
        },
    });

    const tx = usersDB.transaction('users-storage', 'readwrite');
 

    const res = await Promise.all([
        tx.store.add({
            name: 'Admin',
            email: 'admin@example.ru',
            password: 'admin',
            role: 'admin'
        }),
        tx.store.add({
            name: 'User',
            email: 'user@example.ru',
            password: 'user',
            role: 'user'
        }),
        tx.done
    ])


    const data = await usersDB.get('users-storage', 'admin@example.ru')
    console.log(data)
    

  

    
    const notesDB = await openDB('notes', 2, {
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


