const { Worker, workerData } = require('worker_threads');


let count = 0;

function createWorker() {
    let worker = new Worker('./worker.js', { workerData: `Hello, world!\nGithub: github.com/fastuptime\nCount: ${count}` }); // Start the worker.
    worker.on('message', (msg) => { console.log(`${count} ${msg}`); }); // Listen for messages from the worker and print them.
    worker.on('error', (err) => { console.error(`${count} ${err}`); }); // Listen for errors from the worker and print them.
    worker.on('exit', (code) => { // Listen for exit event from the worker and print the exit code.
        if (code != 0)
            console.error(new Error(`Worker stopped with exit code ${code}`));
    });


    setTimeout(() => { worker.postMessage(`My test message! ${count}`); }, 1000); // Send a message to the worker.

    setTimeout(() => { worker.terminate(); }, 3000); // Kill the worker after 2 seconds.
}

setInterval(() => {
    console.log('-----------------');
    count++;
    createWorker();
    if (count == 10) {
        process.exit(0);
    }
}, 1000);