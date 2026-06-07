/* 
         	           					   Native Event System
                                  
               When an event is triggered in the DOM, JS will use Event Propagation.
               Lets say that we have a button nested inside a div, the button was clicked and triggered
               its on-click event. What happens next are the 3 main phases/steps of Event Propagation

               1) Capturing Phase: JS will look for the button element that initially triggered the event.
                                   It starts at the top of the DOM tree (HTML) and works 
                                   its way down until it finds the button element. If there are any event listeners
                                   for the capturing phase in the parent elements, these elements will handle event
                                   before it reaches the button element
    
                                     div.addEventListener('click', () => {
                                         console.log('Div clicked during capturing phase');
                                      }, true);                                                //third argument specifies that the event listener will be triggered on the capturing phase
    
               2) Target Phase: Once JS finds the button element, it will trigger the on-click event handler or event listener
    
               3) Bubbling Phase: The event will then 'bubble' up to the top of the DOM tree. Starting from the 
                                  button element, then finally to the html element. If any element (html, div) has an event listener for the 
                                  bubbling phase of the event, it will be triggered.    
    
                                    div.addEventListener('click', () => {
                                        console.log('Div clicked during bubbling phase');
                                      });

*/
