const { parentPort, workerData } = require('worker_threads');

console.log(workerData); // Prints 'Hello, world!'
parentPort.postMessage('Hello, world!'); // Send a message to the parent thread.
parentPort.on('message', (msg) => { console.log(msg); }); // Listen for messages from the parent thread.