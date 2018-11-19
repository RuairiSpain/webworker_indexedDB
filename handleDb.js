class Database {
    constructor(schema = "db", table = "name") {
        this.table = table;
        this.connect = indexedDB.open(schema);
        this.connect.onupgradeneeded = (e) => {
            this.db = e.target.result;
            this.db.createObjectStore(this.table, { autoIncrement: true });
            this.db.onsuccess = (event) => this.db = event.target.result;
            this.db.onerror   = (event) => self.postMessage(error);
            self.postMessage("START");
        }
        this.connect.onerror = e => console.error('error in open', event);
        this.connect.onsuccess = (event)  => {
            this.db = event.target.result;
            self.postMessage("START");
        }
        this.connect.onblocked = e => console.log('blocked ' , e);
    }

    getTransaction(rw = false) {
        return this.db.transaction([this.table], rw ? "readwrite" : "readonly").objectStore(this.table)
    }

    count() {
        const request = this.getTransaction().count();
        request.onsuccess = (event) => self.postMessage({ count: request.target.result });
        request.onerror = (error) => console.log('ERROR ' , error);
    }

    add(val) {
        const request = this.getTransaction(true).add({ value: val });
        request.onsuccess = (event) => console.log('ADDED ' , event);
        request.onerror    = (error) => console.log('ERROR ' , error);
    }

    readAll() {
        const r = this.getTransaction().getAll();
        r.onsuccess = (event) => self.postMessage(`{ data: ${JSON.stringify(event.target.result)}, count: ${event.target.result.length} }`);
        r.onerror = (error) => console.log('ERROR ' , error);
    }

}

self.addEventListener('message', e => {
    switch(e.data){
       case 'init':
         db = new Database();
       break;
       case 'add':
            db.add();
       break;
       case 'readAll':
          db.readAll();
          break;
       }
    }
);