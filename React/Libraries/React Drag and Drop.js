// npm install react-dnd -D
// npm install react-dnd-html5-backend -D


//The example below will re-arrange a list of items
//KEEP IN MIND, you should NOT use the transform property on items that are being dragged
//doing so will create visual bugs on mobile and tablet devices
//ALSO, use transform: translate(0,0) on the items being dragged to remove the background (sometimes items being dragged will drag the background of its parent element)




//------------------- DndProvider
/* 
    To use React-dnd, you must wrap the entire app inside the DndProvider wrapper

*/

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

function App () {
  
    return (
      <DndProvider backend={HTML5Backend}>                      
            // the rest of the app goes here
      </DndProvider> 
    )
  }







//------------------- useDrag()
/* 
    You can drag elements using the useDrag() hook
*/


function Pawn() {                                              
    const [collect, drag] = useDrag({
        type: 'piece',
        item: () => ({
            name: 'name that identifies the item being dragged'
        }),
        isDragging: (monitor) => { 
            const square = monitor.getItem();            
            return true or false;            //this condition will set the value for 'isDragging'
        },
        canDrag: () => {                      
            return true or false;            //some booolean value must be returned here to enable or prevent dragging          
        },
        collect: (monitor) => ({             //this callback will return the properties and values for the collect object returned from useDrag()
            isDragging: monitor.isDragging()   
        }),
        end: (item, monitor) => {            //this function will be called when the item is finally dropped
            const didDrop = monitor.didDrop();
            const dropResult = monitor.getDropResult();
        }
    })


    return(
        <div style={isDragging ? {opacity: 0} : {opacity: 1}} ref={drag}>
        </div> 
    )
}












//------------------- useDrop()
/* 
        You can use the useDrop() hook to create a container from an element.
        The container will receive items that are being dropped on top of the container.
*/


function Squares() {
    
    const [collect, drop] = useDrop({
        accept: 'piece',                         
        collect: (monitor) => ({                  // collect function will populate the properties of the collect object returned from useDrop()
            handlerId: monitor.getHandlerId()  
        }),
        hover: (item, monitor) => {               // hover function is called when an item being dragged is hovering on top of the container
        },
        drop: (item, monitor) => {                // drop function is called when an item is dropped on top of the container
                                                  
        }
    })


    return(
        <div ref={drop}> 
        </div> 
    )
}












//------------------- useDrop() and useDrag()
/* 
    To make an element draggable and also a container that receives other elements,
    you can use useDrop() and useDrag() together as show below
*/



function Card({card, setCard, itemId}) {
    const cardRed = useRef();
  
    const [collect, drop] = useDrop({      
    })

    const [collect, drag] = useDrag({     
    })

    drag(drop(cardRef));                          //this will enable the current component to be a container that receives draggable items AND be an item that is draggable
  
    return(
        <div ref={cardRef}>
            //display card with styling here
        </div>
    )

  
}

