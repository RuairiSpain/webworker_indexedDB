# webworker_indexedDB
Performance Experiment with WebWorker sendMessage() and IndexedDB 


Combine WebWorkders, JSON stringify and IndexedDB.  

Problem case:
postMessage is slow for large objects messages between workers.  Code investigates ways to use IndexDB to marshal data between worker threads.

ToDo:
Convert to JSON String
Convert to transferable Array (change ownership within threads, source thread loses scope of array)

Need to investigate other solutions from 
https://github.com/GoogleChromeLabs/comlink/blob/master/comlink.ts
https://nolanlawson-com.cdn.ampproject.org/v/s/nolanlawson.com/2016/02/29/high-performance-web-worker-messages/amp/?usqp=mq331AQECAFYAQ%3D%3D&amp_js_v=0.1#referrer=https%3A%2F%2Fwww.google.com&amp_tf=From%20%251%24s&ampshare=https%3A%2F%2Fnolanlawson.com%2F2016%2F02%2F29%2Fhigh-performance-web-worker-messages%2F
