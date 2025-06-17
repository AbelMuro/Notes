//---------------------------------------- EVENTS MODULE ----------------------------------------
//this module handles all types of events that are received from the client 

var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('scream', () => {          //event handler for 'scream' events
    //do something here
})

eventEmitter.emit('scream')                     //triggerring the event 
