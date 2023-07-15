

//===================================== TOOLTIP THAT APPEARS ON HOVER ====================================================
//In the example below, we have a button that will display a small popup everytime we hover over it
//Generally, the process for using this package goes like this.,.
//we use useFloating() to reference the button and the popup, and the hook will return a context object
//we pass the context to an 'interaction' hook like useHover(), it will then return an object
//then we use the useInteraction() and pass the object



import {useState} from 'react';
import {useHover, useInteractions, useFloating, offset, shift} from '@floating-ui/react';




export default function Popup() {
    const [isOpen, setIsOpen] = useState(false);
 
 1) const {refs,                                           // refs are used to reference the button and the popup
           floatingStyles,                                 // floatingStyles contains the css that will make the popup actually float next to button
           context} = useFloating({                        // context represents the button and the popup
      open: isOpen,                                        // passing the state variable that shows if the popup is open or not
      onOpenChange: setIsOpen,                             // passing the set-state function that will be called everytime there is an interaction
      middleware: [offset(-75), shift({padding: 70})]      // offset() moves the popup left or right, shift() moves the popup up and down
    });

 2)   const hover = useHover(context);                       //this is an 'interaction' hook, we pass the context to this hook, this hook will call t
                                                            //this hook will call the setIsOpen() everytime the user hovers over the button
 3)   const {getReferenceProps, getFloatingProps} = useInteractions([   //this hook will use the 'interaction' hook above and return props
        hover,                                                          // that must be passed to the button and popup
      ]);

    return(
        <>
            <button ref={refs.setReference} {...getReferenceProps()}>
                    'Hover over this button'
            </button>
            {isOpen ? 
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                    Hold down to slide!
                </div> : <></>}       
        </>

    )
}





//===================================== TOOLTIP THAT APPEARS AUTOMATICALLY ====================================================
//The example below will display a tooltip when the component first gets mounted, and will close when the user clicks on the button inside the tooltip


const PhoneMockup = () => {
    const [isOpen, setIsOpen] = useState(true);
 
    const {refs, floatingStyles} = useFloating({                             
         open: isOpen,                                        
         onOpenChange: setIsOpen,  
         middleware: [offset(-450), shift({padding: 400})],
         whileElementsMounted: autoUpdate,                                    //this is important, when the window is resized, the tooltip will follow its container 
       });

    const handleClosePopup = () => {
        setIsOpen(false);
    }
   

    return(
        <section>
            <button ref={refs.setReference}>
                'hover over this button!'
            </button>
            {isOpen ? 
                <div ref={refs.setFloating} style={floatingStyles} className={styles.tooltip}>
                    'Tooltip'
                    <button onClick={handleClosePopup}> 'Close Tooltip'<button>
                </div> : <></>
            }
        </section>
    )
}








