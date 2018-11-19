w = new Worker("./handleDb.js");

w.onmessage = function(event) {
  document.getElementById("result").innerHTML = event.data;
};

w.postMessage("init");

function readAll() {
  w.postMessage("readAll");
}

function add() {
  w.postMessage("add");
}


function mainThreadRead() {
   open()
    .then(db => read(db))
    .then(data => document.getElementById("result").innerHTML = JSON.stringify(data));
}



function open(schema = "db", table = "name") {
    return new Promise((resolve, reject) => {
        const connect = indexedDB.open(schema);
        connect.onupgradeneeded = (e) => {
            const request = e.target.result;
            request.createObjectStore(table, { autoIncrement: true });
            request.onsuccess = (event) => resolve(event.target.result);
            request.onerror   = (error) => reject(error);
        }
        connect.onerror = error => reject(error);
        connect.onsuccess = (event)  => {
            resolve(event.target.result);
        }
        connect.onblocked = error => reject(error);
    });
}

function read(db, table = "name") {
    return new Promise((resolve, reject) => {
        const request = db.transaction([table], "readonly").objectStore(table).getAll();
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (error) => reject('ERROR ' , error);
    });
}
