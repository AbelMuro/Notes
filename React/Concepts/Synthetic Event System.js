/*
                                                  SYNTHETIC EVENT SYSTEM
                                                  
                     React has its own implemenation of an event system that is similar to the native event system in the browser.
                     The main difference is that React defines how certain events behave. If we take for example the
                     onChange event handler for <input/> elements, React will call the onChange event handler every time there
                     is a change in the input, but the native onChange event handler is not called every time.




                                                RECAP OF NATIVE EVENT SYSTEM
   
                     When an event is triggered in the DOM, React will use a variation of Event Propagation.
                     Lets say that we have a button nested inside a div, the button was clicked and triggered
                     its on-click event. What happens next are the 3 main phases/steps of Event Propagation
        
                             1) Capturing Phase: React will look for the button element that initially triggered the event.
                                                 It starts at the top of the DOM tree (HTML) and works 
                                                 its way down until it finds the button element. If there are any event handlers
                                                 or event listeners in the parent elements, these elements will handle the event
                                                 before it reaches the button element

                                                 document.addEventListener(() => {}, true);
                                                 <div onClickCapture={handleClick}/>   

                             2) Target Phase:  Once JS finds the button element, it will trigger the on-click event handler or event listener
                
                             3) Bubbling Phase: The event will then 'bubble' up to the top of the DOM tree. Starting from the 
                                                button element, then finally to the html element. If any element (html, div) has 
                                                an event handler attached, it will be triggered.   

                                                document.addEventListener(() => {});
                                                <div onClick={handleClick}>
                                                 

*/
