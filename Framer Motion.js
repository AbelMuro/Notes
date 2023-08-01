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



