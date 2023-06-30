// npm install react-dnd -D
// npm install react-dnd-html5-backend -D


//The example below will re-arrange a list of items

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"



function App () {
    const [cards, setCards] = useState([
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },
      {
        id: 3,
        text: 'Write README',
      },
      {
        id: 4,
        text: 'Create some examples',
      }
    ])
  
    return (
      <DndProvider backend={HTML5Backend}>                      //make sure to wrap your app component with this context provider
          <main>
            {cards.map((card, i) =>                                  
               return(<Card card={card} setCards={setCard} itemId={i}/>)
          </main>
      </DndProvider> 
    )
  }





function Card({card, setCard, itemId}) {
    const cardRed = useRef();
  
    const [{handlerId}, drop] = useDrop({      // by using this hook, the current component will be used as a container that will receive items being dragged
        accept: 'todo',                         
        collect: (monitor) => ({               // collect function will have access to the 'monitor', the monitor is an object that lets you access drag and drop states changes
            handlerId: monitor.getHandlerId()  // handlerId is used to identify a container that receives draggable items
        }),
        hover: (item, monitor) => {             // hover function will receive the item that is being dragged ON TOP of the container
            setItem(
                //change the order of the items here
            )
        },
        drop(item, monitor) => {                // drop function will receive the item that was DROPPED on the container
            //typically, you can add the item that was dropped onto the state(array) of this component
        }
    })

    const [{isDragging}, drag] = useDrag({      // by using this hook, the current component will be used as an item that can be dragged
        type: 'todo',
        item: () => {                           // item function that will return data about the item that is currently being dragged
            return {index, itemId}
        },
        isDragging: (monitor) => {              // isDragging function lets you define how the props isDragging will be true or false based on a condition
            return itemId === monitor.getItem().itemId;    //this will ensure that isDragging still represents the item being dragged (monitor will always check if a item is currently beind dragged)
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()    //keep in mind that every property that is returned from the collect function can have its own method like isDragging above
        })
    })

    drag(drop(cardRef));                          //this will enable the current component to be a container that receives draggable items AND be an item that is draggable
  
    return(
        <div ref={cardRef} data-handler-id={handlerId} style={isDragging ? {opacity: 0} : {opacity: 1}}>
            //display card with styling here
        </div>
    )

  
}


