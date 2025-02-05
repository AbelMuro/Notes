// npm install react-dnd -D
// npm install react-dnd-html5-backend -D


//The example below will re-arrange a list of items
//KEEP IN MIND, you should NOT use the transform property on items that are being dragged
//doing so will create visual bugs on mobile and tablet devices

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
               return(<Card card={card} setCards={setCard} itemId={card.id}/>)
          </main>
      </DndProvider> 
    )
  }





function Card({card, setCard, itemId}) {
    const cardRed = useRef();
  
    const [{handlerId}, drop] = useDrop({      // by using this hook, the current component will be used as a container that will receive items being dragged
        accept: 'todo',                         
        collect: (monitor) => ({               // collect function will have access to the 'monitor', the monitor is an object that lets you access drag and drop states changes
            handlerId: monitor.getHandlerId()  // you must call these methods to get the value and the will be returned from the useDrop hook
        }),
        hover: (item, monitor) => {             // hover function will receive the item that is being dragged ON TOP of the container
            setItem(
                //change the order of the items here
            )
        },
        drop: (item, monitor) => {                // drop function will receive the item that was DROPPED on the container
            //typically, you can add the item that was dropped onto the state(array) of this component
        }
    })

    const [{isDragging}, drag] = useDrag({      // by using this hook, the current component will be used as an item that can be dragged
        type: 'todo',
        item: () => {                           // item function that will return data about the item that is currently being dragged
            return {index, itemId}
        },
        isDragging: (monitor) => {              // isDragging function lets you define how the props isDragging will be true or false based on a condition
            return itemId === monitor.getItem().itemId;    //this will ensure that isDragging still represents the item being dragged (monitor will always check if a item is currently being dragged)
        },
        canDrag: () => {                        //canDrag function lets you control which items are draggable and which are not
            return true;            
        }
        collect: (monitor) => ({
            isDragging: monitor.isDragging()    //isDragging is returned from the hook because the collect method returns an object with 'isDragging'
        })
    })

    drag(drop(cardRef));                          //this will enable the current component to be a container that receives draggable items AND be an item that is draggable
  
    return(
        <div ref={cardRef} data-handler-id={handlerId} style={isDragging ? {opacity: 0} : {opacity: 1}}>
            //display card with styling here
        </div>
    )

  
}



//==================================================================================================================


function Squares({row, column}) {
    const dispatch = useDispatch();
    const currentSquare = useSelector(state => state.chess.board[row][column]);
    const piece = currentSquare.piece;
    
    const [{handlerId}, drop] = useDrop({
        accept: 'piece',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId()
        }),
        canDrop: () => {
            return //some condition goes here
        },
        drop: (item, monitor) => {
            dispatch({type: 'MOVE_PIECE', payload: {piece: item.piece}})
        }

    })


    return(
        <div ref={drop} data-handler-id={handlerId}> 
                {piece.includes('pawn') && <Pawn/>}
                {piece.includes('queen') && <Queen/>}
                {piece.includes('rook') && <Rook />}
                {piece.includes('knight') && <Knight/>}
                {piece.includes('bishop') && <Bishop/>}
                {piece.includes('king') && <King />}
        </div> 
    )
}



function Pawn({row, column}) {                                              
    const dispatch = useDispatch();
    const [{isDragging}, drag] = useDrag({
        type: 'piece',
        item: () => {
            return {row, column};
        },
        isDragging: (monitor) => { 
            const square = monitor.getItem();            
            return row === square.row && column === square.column;         //this condition will set the value for 'isDragging'
        },
        canDrag: () => {                      
            //some condition must be returned here to enable or prevent dragging          
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()   
        }),
        end: (item, monitor) => {                                            //this function will be called when the item is finally dropped
            const didDrop = monitor.didDrop();
            const dropResult = monitor.getDropResult();
            if(didDrop){
                console.log('item dropped');
            }
        }
    })


    return(
        <div style={isDragging ? {opacity: 0} : {opacity: 1}} ref={drag}>
            <img className={styles.piece} src={icons[`${color}Pawn`]} />  
        </div> 
    )
}












