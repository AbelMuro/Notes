/* 
                          WORKER THREADS

            Worker threads is a module that can be used to create more threads in a node.js app. These threads 
            are designed to perform tasks that are more CPU-intesive.

            The worker_threads module is built into node.js
*/

// --------------- worker.js

    const { parentPort, workerData } = require('worker_threads');                    //workerData is an object that is received from app.js
    
    let sum = 0;
    
    for (let i = 0; i < 5000000000; i++) {
      sum += i * workerData;
    }
    
    parentPort.postMessage(sum);






//--------------- app.js

  const { Worker } = require('worker_threads');
  
  app.get('/calculate', (req, res) => {
      const worker = new Worker('./worker.js'), { workerData: {number: 1000000000}});      // workerData is an object you pass to worker.js
    
      worker.on('message', result => {              
        res.status(200).json({result});
      });
    
      worker.on('error', err => {
        res.status(500).json({error: err.message});
      });
    
      worker.on('exit', code => {
        if (code !== 0) 
          res.status(500).json({error: `Worker stopped with exit code ${code}`});
      });
  });

