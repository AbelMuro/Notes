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
    const [collect, drag] = useDrag({            // collect = {isDragging}
        type: 'piece',
        item: () => ({
            name: 'name that identifies the item being dragged'
        }),
        isDragging: (monitor) => { 
            const square = monitor.getItem();  //method that returns the object that is defined in the item method above          
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
        <div style={isDragging ? {opacity: 0} : {opacity: 1}} ref={(ref) => {drag(ref)}}>
        </div> 
    )
}












//------------------- useDrop()
/* 
        You can use the useDrop() hook to create a container from an element.
        The container will receive items that are being dropped on top of the container.
*/


function Squares() {
    
    const [collect, drop, preview] = useDrop({
        accept: 'piece',                         
        collect: (monitor) => ({                  // collect function will populate the properties of the collect object returned from useDrop()
            handlerId: monitor.getHandlerId(),
            isOver: monitor.isOver()
        }),
        hover: (draggedItem, monitor) => {               // hover function is called when an item being dragged is hovering on top of the container
        },
        drop: (droppedItem, monitor) => {                // drop function is called when an item is dropped on top of the container
                                                  
        }
    })


    return(
        <div ref={(ref) => {drop(ref)}}> 
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






//-------------------- useDragLayer()
/* 
    You can use this hook to create a custom snapshot of an item that is being dragged instead of 
    relying on the snapshot created by the browser.

    The following hook should be rendered once in the root of the app
*/



function CustomSnapshot(){
    const {item, currentOffset, isDragging} = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset()
    }));

    if(!isDragging) return null

    return (
        <div className={styles.container} style={{position: 'fixed', left: currentOffset.x, top: currentOffset.y}}>
            <h1>
                {item.name}
            </h1>
            <p>
                {item.desc}    
            </p>
        </div>
    )
    
}


//------------------ Removing snapshot of dragged item
/* 
    You can remove the default snapshot that the browser takes of an item that is being dragged
    by using getEmptyImage() and calling the preview function from useDrag()
*/

import { getEmptyImage } from 'react-dnd-html5-backend';

function Card() {
    const [_, _,  preview] = useDrag();

    useEffect(() => {
        preview(getEmptyImage());
    }, [preview])

    return (
        <div>

        </div>
    )
}





