//Framer motion is a library used to create animations for react applications
//npm install framer-motion






//==================================== DECLARATIVE ANIMATIONS:  <motion/> component =========================================================


import {motion} from 'framer-motion';

// INITIAL AND ANIMATE: this will animate the circle from opacity: 1 to opacity: 2
// you can animate multiple properties at the same time
function Circle () {
  return(
    <> 
       <motion.div 
          className='circle' 
          initial={{opacity: 0, scale: 0.5}}                    //you can set false to this attribute and the animation will cancel automatically 
          animate={{opacity: 1, scale: 1.2}}                    //if you set null to one of the css properties, it will use the default value for the property
          transition={{
              duration: 3,
              times: [0, 0.2, 1],                               //by default, the animation is spaced evenly, you can override this with the times prop
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
          }}                 
        />  
  )
}















// ARRAYS ANIMATION: this will animate through the values of an array
function Circle
    return(
        <motion.div
          animate={{   
            x: [-100, -50, 0, 50, 100, 150],            
            scale: [null, 2, 2, 1, 1],          //keep in mind that if you use null as one of the values, it will use the default value for the property
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        />
    )
  }














          
// GESTURES: this will create a hover animation and a click animation when the user hovers or clicks on the circle
function Circle() {
  return (
       <motion.div 
          className='circle' 
          initial={{opacity: 0}}
          whileHover={{scale: 1.2}}                        
          whileTab={{scale: 0.9}}    
          whileInView={{opacity: 1}}
        />          
    )
}





















//VARIANTS: you can use the variants prop to create animations in child components

const list = {
      visible: { opacity: 1,
                 transition: {
                  when: "beforeChildren",     //parent components animation will finished before the childrens animations starts
                  staggerChildren: 0.3,
                },
               },
      hidden: { opacity: 0 ,
                transition: {
                    when: "afterChildren",    //parent components animation will finish after the childrens animation ends
                },
              },
  }

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

function AnimateList() {
    return (
        <motion.ul
          initial="hidden"                    //this MUST be either visible or hidden
          animate="visible"                   //this MUST be either visible or hidden
          variants={list}
        >
          <motion.li variants={item} />      //variant prop here MUST have visible or hidden properties in the object
          <motion.li variants={item} />
          <motion.li variants={item} />
        </motion.ul>
    )
}
















//DYNAMIC VARIANTS: variants can be a function that can use its parameters to dynamically style a css property

const variants = {
  visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
      },
  }),
  hidden: { opacity: 0 },
}

function VariantsWithFunctions() {
  
    return items.map((item, i) => (
      <motion.li
        custom={i}              //here you are calling the visibile function and passing a value
        animate="visible"
        variants={variants}    
      />
  ))
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
















//DRAGGABLE WITH CONTAINER: you can create a large container and use it as the area in which a draggable item can be dragged
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






















//EXIT ANIMATIONS: before an element is removed from the dom, you can use the exit prop to apply some animation before the element is removed
const variants = {
    exit: {
        x: -1000
    }
};

function App() {
    const [remove, setRemove] = useState(false);

    const handleClick = () => {
        setRemove(!remove);
    }


    return(
        <AnimatePresence>
            {remove ? <></> : 
            <motion.div                      //before this element is removed, it will run some animation
                key='1'                      //key prop is required for this to work
                className={'box'} 
                variants={variants} 
                exit='exit'                  //the exit prop will use the exit property from the object in variants
              />}
                
            <button onClick={handleClick}>
                remove from dom
            </button>        
        </AnimatePresence>

    )
}
















//================================== IMPERATIVE ANIMATIONS: useAnimate() ==========================================
//useAnimate() works in the same way as <motion/> component
//the difference here is that useAnimate() allows for a more complex way of handling animations

import {useAnimate} from 'framer-motion';

function App() {
    const [ref, animate] = useAnimate();        //ref is an object that must be assigned to the element we want to animate

    useEffect(() => {
        const animation = async () => {
          await animate(scope.current, { x: 0 }, {duration: 0.5})            //second object is the css properties
          await animate(scope.current, { x: 100}, {duration: 0.5, delay: 2}) //third object is the transition properties
          await animate(scope.current, { x: 20}, {duration: 0.5})
          await animate('div', {y: 45}, {duration: 0.4})                      //you can use a tag selector to animate a group of elements
        }
        
        animation();

      return animation.stop;                     //when the component is unmounted, it will call the stop() function to clean up the animation
      }, [])

    return(    
        <div className={'box'} ref={ref}></div>
    )
}



//MOTION VALUES: you can use the motionValue() hook with the useAnimateHook() and useTransform()

function App() {
    const [,animate] = useAnimate();
    const count = useMotionValue(0);                                       //we essentially return an object that has a reference to 0
    const rounded = useTransform(count, latest => Math.round(latest));      
    
    useEffect(() => {
      const controls = animate(count, 100)                                 //we animate the motion value from 0 to 100
      
      return controls.stop
    }, [])
    
    return <motion.div>
            {rounded}
        </motion.div>
  
}





















//==================================== useScroll() and useSpring() ====================================================

/*  
    useSpring() is a hook used to create an specific type of animation that resembles a spring
    useScroll() is a hook that returns 4 values; 

    scrollYProgress: the current progress of the scroll position of the viewport (y-axis) 0-1
    scrollXProgress: the current progress of the scroll position of the viewport (x-axis) 0-1

    In the example below, we are using useScroll() and useSpring() together to create 
    an animation that expands an element based on the progress of the scroll in the viewport's y-axis
    We create the illusion of a progress bar that stays fixed to the top of the viewport
    and will grow or shrink as the user scrolls down or up
*/

import {motion, useScroll, useSpring}

function ProgressBar() {
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,         //how fast the animation occurs
        damping: 30,            //how fast the animation ends
        restDelta: 0.001
    })

    return(
        <motion.div className={'progress-bar'} style={{scaleX}} />  
    )
}

/* 
    .progress-bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 10px;
        background-color: red;
        transform-origin: 0%;
    }
*/














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















