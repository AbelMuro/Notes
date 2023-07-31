//Framer motion is a library used to create animations for react applications
//npm install framer-motion


//-------------------------------- <motion/> component ---------------------------------------------------
//in the example below, we use the motion component to create a div that will be styled into a circle
//then we use the initial and animate props to animate the circle from invisible to visible
// you can animate any property

import {motion} from 'framer-motion';

function Circle () {
  const constraints = useRef();
  
  return(
    <> 
       <motion.div 
          className='circle' 
          initial={{opacity: 0, scale: 0.5}}               
          animate={{opacity: 1, scale: 1.2}}              {/* this will animate the circle from opacity: 1 to opacity: 2 */}
          transition={{duration: 0.5}}                    {/* it will take 0.5 seconds for the animation to complete */}
        />  

        <motion.div
          animate={{                                      {/* You can animate through the values of an array */}       
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        />
          
       <motion.div 
          className='circle'                    
          whileHover={{scale: 1.2}}                        {/* this will create a hover animation for the circle*/}
          whileTab={{scale: 0.9}}                          {/* this will create a click animation for the circle*/}
        />          

        <motion.div    
            drag                                           {/* this will make the circle draggable but with certain constraints*/}
            dragConstraints={{
              top: -50,                                    {/* keep in mind that these 'contraints'*/}
              left: -50,
              right: 50,
              bottom: 50,
            }}
          />

     <div>           
        <motion.div 
          className={'container'}                        {/* this div will be the container in which the draggable circle can be dragged*/}
          ref={contraints}>                               {/* you must assign the same ref object to the container and the draggable item*/}

        <motion.div    
            drag                                           {/* this will make the circle draggable but with certain constraints*/}
            dragConstraints={contraints}                   {/* if you assign a ref object to dragContraints*/}
          />
    </div>

            
    </>

  )
}
