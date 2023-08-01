//Framer motion is a library used to create animations for react applications
//npm install framer-motion






//==================================== <motion/> component =========================================================


import {motion} from 'framer-motion';


// INITIAL AND ANIMATE: this will animate the circle from opacity: 1 to opacity: 2
// you can animate multiple properties at the same time
function Circle () {
  return(
    <> 
       <motion.div 
          className='circle' 
          initial={{opacity: 0, scale: 0.5}}               
          animate={{opacity: 1, scale: 1.2}}              
          transition={{duration: 0.5}}                    
        />  
  )
}


// ARRAYS: this will animate through the values of an array
function Circle
    return(
        <motion.div
          animate={{                                      
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        />
    )
  }


          
// HOVER AND TAB: this will create a hover animation and a click animation when the user hovers or clicks on the circle
function Circle() {
  return (
       <motion.div 
          className='circle'                    
          whileHover={{scale: 1.2}}                        
          whileTab={{scale: 0.9}}                          
        />          
    )
}


//DRAGGABLE: this will make the circle draggable but with certain constraints
//the circle below can only be dragged 50px to the top, 50 px to the left, etc..
function Circle() {
    return(
        <motion.div    
            drag                                         
            dragConstraints={{
              top: -50,                                
              left: -50,
              right: 50,
              bottom: 50,
            }}
          />
      )
}


//DRAGGABLE IN CONTAINER: you can create a large container and use it as the area in which a draggable item can be dragged
function Circle() {
      const contraints = useRef();
  
      return(
         <div>           
            <motion.div 
              className={'container'}                        {/* large container that will be used for the draggable item*/}
              ref={contraints}>                               {/* you must assign the same ref object to the container and the draggable item*/}

            <motion.div    
                drag                                           {/* draggable item*/}
                dragConstraints={contraints}                  
              />
        </div>
      )
    
}

//SCROLLING ANIMATION: you can animate an element based on scrolling

function Circle() {

    return(
          <motion.div 
            className={'circle'} 
            initial={{opacity: 0, backgroundColor: 'green'}} 
            whileInView={{opacity: 1, backgroundColor: 'white'}}                 //once this element is in view, it will trigger the animation
            viewport={{once: true}}                                              //decide to repeat the animation once or an indefinite amount of times
          />
    )
          
}








//================================== useMotionValue() and useTransform() =============================================================
//These two hooks are used together to keep track of changes during an animation
//useMotionValue returns a 

import {motion, useMotionValue, useTransform } from 'framer-motion';

function MotionValues() {
    const x = useMotionValue(0);      
    const background = useTransform(
      x,
      [-100, 0, 100],
      ['red', 'green', 'white'],
    )
  
    return(
        <motion.div style={{background}}>
        </motion.div>
    )
}












//=========================================== useCycle() =======================================================================================
//useCycle() works similarly to useState(), it can be used to toggle between two different sets of styles
//in the example below, we will have a button that will display a circle and a square when it is clicked on



const variantsForCircle = {                                    //we will toggle between these two objects with useCycle
      open: {
          opacity: 1,
          backgroundColor: 'green'
      },
      closed: {
          opacity: 0,
          backgroundColor: 'transparent'
      }
   }

const variantsForSquare = {                                    //we will toggle between these two objects with useCycle
      open: {
          opacity: 0.5,
          backgroundColor: 'red'
      },
      closed: {
          opacity: 0,
          backgroundColor: 'transparent'
      }
   }




function App() {
    const [isOpen, toggleOpen] = useCycle(false, true);              //isOpen will have either true or false as the values, toggleOpen() is a function used to toggle between true and false

    const handleClick = () => {
        toggleOpen();
    }

    return(
        <>
            <motion.div
                className={'circle'}
                initial={false}
                animate={isOpen ? 'open' : 'closed'}                    //animate property will toggle between the 'open' styles and the 'closed' styles
                variants={variantsForCircle}>                           //you must pass an object that has the two properties 'open' and 'closed'
                  
                  <motion.div                                            //by clicking on the button below, this child element will also have its styles toggle between 'open' and 'closed'
                      className={'square'}                              //but it MUST have a variants prop
                      variants={variantsForSquare}                       //you must pass an object that has the two properties 'open' and 'closed', it doesnt have to be the same object that you pass to the parent component
                      />    
                        
            </motion.div>    

            <button onClick={handleClick}>                              //clicking on this button will toggle between the 'open' styles and the 'closed' styles
                click me
            </button>    
        </>

    )
}


//==============================================















