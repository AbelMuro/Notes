/*  
                          DOM EVENT SYSTEM
      Every browser has a native event system that uses events to cause a change in a web app.
      This system uses the following three phases.

*/

/*
            1. Capturing phase (phase 1)
                  The event travels from the root (window/document) down the DOM tree toward the target.
                  Listeners registered with addEventListener and {capture: true} fire here.
*/
                      document.addEventListener("click", () => {
                      }, { capture: true });                      //this third argument ensures that the listener will be called during this phase



/* 
           2. Target phase (phase 2)
                  The event reaches the target element.
                  addEventListeners on the target fire (regardless of capture/bubble setting).
*/
                      document.addEventListener("click", (e) => {
                          e.target;                              //this will return the element that was clicked on (the target element)
                          e.target.closest('.className');        //this will return a boolean value indicating if the target is either '.className' or any of its descendants
                          e.target.classList.contains('.className');       //self explanatory          
                      }); 


/* 
            3. Bubbling phase (phase 3)
                  The event then travels back up the DOM tree toward the root.
                  By default, all event listeners will fire during this phase, unless 
                  {capture: true} is set on the third argument
*/        

                      document.addEventListener("click", () => {}); 
