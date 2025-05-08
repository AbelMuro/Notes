/* 
            Framer-motion is an animation library used to create animations for React

            npm install framer-motion
*/



/* 
            A FEW THINGS TO NOTE HERE:

            if the website shifts to the left or right, you can fix this bug by using the following selector

            html, body, #root {
              max-width: 100vw;
              overflow-x: hidden;          //this will prevent the website from being moved to the left or right
              transition: none;            //this can also help prevents bugs with framer motion
            }


*/



//======================================================== DECLARATIVE ANIMATIONS:  <motion/> component ================================================================================================
/* 
            The <motion/> component is used to create animation with a component.
            Most animations that framer-motion uses consist of changing the values
            of a css property. The <motion/> component changes these css values by 
            using three props; initial, animate and transition to create the
            animation
*/


//-------------------------- Initial and Animate Props
/* 
            The initial and animate props accept an object that
            has css properties. The initial prop will have the 
            initial styles of the component. The animate prop will
            have the styles the component will animate into.
*/

import {motion} from 'framer-motion';

function App() {
     return(
            <motion.div 
                 initial={backgroundColor: 'white', x: 0} 
                 animate={                                                
                        backgroundColor: 'red', 
                        x: [-100, -50, 0, 50, 100, 150]                        //will animate through an array of values
                 }>
            </motion.div>
     )
}




//-------------------------- Transition Prop
/* 
            The transition prop is used to control and specify
            how an animation will take place.
*/


function Circle () {
  return(
    <> 
       <motion.div       
          initial={{opacity: 0, scale: 0.5}}                    //you can set false to this attribute and the animation will cancel automatically 
          animate={{opacity: 1, scale: 1.2}}                    //if you set null to one of the css properties, it will use the default value for the property
          transition={{
              type: 'spring',                                   // Spring-based animation
              bounce: 0.24,                                     // determines the level of bounciness the animation will be, must be a value between 0 and 1 
              damping: 6,                                       // Strength of opposing force. If set to 0, spring will oscillate indefinitely. Set to 10 by default.
              mass: 21,                                         // Mass of the moving object. Higher values will result in more lethargic movement. can be any number
              stiffness: 150,                                   // Stiffness of the spring. Higher values will create more sudden movement
            
              type: 'tween',                                    // Duration-based animation
              duration: 3,                                      // duration of the animation
              delay: 0.5,                                       // can delay the animation in seconds                                        
              ease: [0, 0.71, 0.2, 1.01],                       // defines a timing function, can be 'linear', 'ease-in', 'ease-out', or an array of integers

              repeat: 1, 2, 'Infinite',                         // the number of times the transition will occur
              repeatType: 'loop, reverse, mirror',              // loop repeats the animation from the start, reverse alternates between forward and backwards playback
              repeatDelay: 0.3,                                 // the delay between each repeating transition 

              when: "beforeChildren or afterChildren",          // parent component transitions will finish before or after childrens transition
              delayChildren: 0.2,                               // similar to the property above, but it offers a more precise delay
              staggerChildren: 0.1,                             // first child will be delayed by 0.1, the second child delayed by 0.2, the third child delayed by 0.3 (calculate staggerDelay will be added to delayChildren)
              staggerDirection: -1,                             // direction in which the children are delayed, -1 means the last child is delayed by 0.1, the second to last child is delayed by 0.2...  

              opacity: {duration: 0.2},                         // you can assign a transition to a specific property like this
              from: 90,                                         // this defines the initial value for ALL css properties that are in the animate prop, this is similar to initial prop   
              times: [0, 0.2, 1],                               // by default, the animation is spaced evenly, you can override this with the times prop 0 -> 0.2 -------> 1
          }}                 
        />  
  )
}







//-------------------------- Variants Prop
/* 
            Variants are a way to modularize your props and objects
            Complex animations can require large objects to be assigned
            to the initial and animate props of your motion component.
            You can simplify your code by using variants.
*/
const item = {
      visible: {  
            opacity: 1,
            transition: {  
                duration: 1.2      
            },
      },
      hidden: { 
            opacity: 0,
      },
}


function AnimateList() {
    return (
        <motion.div
            initial="hidden"                        // framer-motion will get the 'hidden' property from the 'item' object and assign it to this prop       
            animate="visible"                       // framer-motion will get the 'visible' property from the 'item' object and assign it to this prop
            variants={item}                         // you must assign the object that contains the css properties here             
        >
        </motion.div>
    )
}



























//============================================================== useCycle() =======================================================================================
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






//============================================================================== useAnimate() ==================================================================================
//useAnimate() works in the same way as <motion/> component
//the difference here is that useAnimate() allows for a more complex way of handling animations

import {useAnimate} from 'framer-motion';

function App() {
    const [ref, animate] = useAnimate();        //ref is an object that must be assigned to the element we want to animate

    useEffect(() => {
        const animation = async () => {
          const animating = await animate(ref.current, { x: 0 }, {duration: 0.5})            //second object is the css properties
          await animate(ref.current, { x: 100}, {duration: 0.5, delay: 2})                   //third object is the transition properties
          await animate(ref.current, { x: 20}, {duration: 0.5})
          await animate('div', {y: 45}, {duration: 0.4})                                    //you can use a tag selector to animate a group of elements
        }
        
        animation();

      return () =>  {animating.stop;}                     //when the component is unmounted, it will call the stop() function to clean up the animation
      }, [])

    return(    
        <div className={'box'} ref={ref}></div>
    )
}





//====================================================================== useAnimationControls() =======================================================================================
// With this hook, you have better control on when the animations can start or end

function Animate() {
    const controls = useAnimationControls();  
    const [data, setData] = useState();

    const handleClick = () => {
          setData('new data')               
    }

    useEffect(() => {
        //if you want sequential animation, then use async function
        const animation = async () => {
            await controls.set({backgroundColor: red});                                    //instantly sets a property and skips the animation
            await controls.start({ scale: 2 , transition: {type: 'spring'}})                //you can trigger any animation like this
            await controls.start('variant');                                                 //you can trigger a variant animation like this    
            await controls.start(custom => ({                                                //you can use a custom prop to pass data to this callback
                 scale: custom * 3       
            }))
        }
        animation();
            
        return () => controls.stop();               //you can stop any animation with stop()
    }, [data])

    return (
            <div custom='123' initial='hidden' animate={controls}>
                 <button onClick={handleClick} variants={myVariantsObject}> 
                     click me
                 </button>
                 <button onClick={handleClick} variants={myVariantsObject}> 
                    click me
                 </button>                
            </div>

    )


const myVariantsObject = {
      hidden: {
            opacity: 0
            }
      show: {
        opacity: 1
      }
}








//=======================================================================  VARIANTS ===================================================================================================
//VARIANTS: you can use the variants prop to create animations in child components
//Keep in mind that if you use variants for a child component, and the animation is triggered throught the parent component
// you should not have use any animation for the child components through the initial and animate prop


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











//============================================================================= EXIT ANIMATIONS ====================================================================================

//EXIT ANIMATIONS: before an element is removed from the dom, you can use the exit prop to apply some animation before the element is removed
const variants = {
    exit: {
        x: -1000,
        opacity: 0,
    }
};

function App() {
    const [remove, setRemove] = useState(false);

    const handleClick = () => {
        setRemove(!remove);
    }


    return(
        <AnimatePresence initial={false}>  //you can set initial to false to skip the first initial animation
            {remove ? <></> : 
            <motion.div                      //before this element is removed, it will run some animation
                key='1'                      //key prop is required for img tags or any element that has a img as a child
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















//================================================================================= DRAGGABLE COMPONENTS ========================================================================================================

//the circle below can only be dragged 50px to the top, 50 px to the left, etc..
function Circle() {
    return(
        <motion.div    
            drag                           //you can set drag='x' or drag='y' to force the element to only drag on the x-axis or y-axis        
            dragSnapToOrigin={true}        //this will force the element to go back to its origin when the user stops dragging the element
            dragElastic={1}                //must be a value between 0 and 1; the degree of movement allowed outside of constraints
            dragMomentum={true}            // applies momentum (element keeps moving) when the user stops dragging the element
            dragPropagation                // if a child component is dragged, it will also drag the parent component with it
            dragListener={false}           // setting this to false will ensure that this element can ONLY be dragged using useDragControls()
            dragTransition={{              //applies an animation when the user lets go of the draggable element and hits one of the contraints
                bounceStiffness: 600,      //the animation takes the form of a spring
                bounceDamping: 10 }}
            dragConstraints={{
              top: 50,                                
              left: 50,
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
              ref={contraints}/>                             {/* you must assign the same ref object to the container and the draggable item*/}

            <motion.div    
                drag                                         {/* draggable item*/}
                dragConstraints={contraints}                  
              />
        </div>
      )
    
}

//DRAG CONTROLS: you can drag a component by clicking on another component
function DragControls () {
  const dragControls = useDragControls();

  const startDrag = (e) => {
      dragControls.start(e, {snapToCursor: true})
  }
  
  return(
      <button onPointerDown={startDrag}>            //by clicking on this button, you can drag the element below
          click me
      </button>
      <motion.div 
        className={'box'} 
        dragControls={dragControls}
      />
  )
}
















//======================================================================================= GESTURES =======================================================================================
// Gestures are similar to click events, focus, events, hover events, etc

function Circle() {
  return (
       <motion.div 
          className='circle' 
          initial={{opacity: 0}}
          whileHover={{
            scale: 1.2,
            transition: {duration: 2}              //remember that you can use transition with gestures
          }}      
          whileTab={{scale: 0.9}}                  //gesture for click events
          whileInView={{opacity: 1}}               //gesture for elements that first appear in the viewport
            viewport={{once: true}}                //the whileInView gesture will only run once
          whileFocus={{scale: 1.2}}                //gesture for input elements or any element that receives focus
          whileDrag={{color: 'red'}}               //gesture for elements that are currently being dragged

          onHoverStart={(e) => {}}                 //function that fires when the user hovers over the element
          onHoverEnd={(e) => {}}                   //function that fires when the users mouse leaves the element
          onTabStart={(e, info) => {}}             //function that fires when the tab start on the element (info = {point: {x, y}})
          onTabCancel={(e, info) => {}}            //function that fires when the tab ends (info = {point: {x, y}})
          onPanStart={(e, info) => {}}             //function that fires when the user presses down on an element and then moves away at least 3 pixels  (info = {point: {x, y}})  for mobile -> touch-action: none; this will disabled pan on mobile device
          onPanEnd={(e, info) => {}}               //function that fires when the user stop panning
          onDragStart={(e, info) => {}}            //function that fires when the user starts dragging the element
          onDragEnd={(e, info) => {}}              //function that fires when the user stops dragging the element
      />          
    )
}


//GESTURES WITH VARIANTS: you can propagate changes to the child components with variants through gestures
const variants = {
  hover: {
    scale: 1.2,
    transition: {duration: 2}
  },
  tab: {
    scale: 0.9
  }
}

function Circle() {
  return (
       <motion.div 
          className='circle' 
          whileHover={'hover'}                        
          whileTab={'tab'}    
          variants={variants}
        >                                   //the onPointerDownCapture is used to prevent the child component from firing the gestures on the parent component
            <motion.div variants={variants} onPointerDownCapture{e => e.stopPropagation()}> 
            </motion.div>
        </motion.div>
    )
}











//==================================================================================== SCROLLING ANIMATION =========================================================================================================
//you can animate an element based on the scroll position of the user

function Circle() {
    const {scrollYProgress, scrollXProgress } = useScroll();        //we get the current value of the scroll position on the y-axis
  
    return(
          <motion.div 
            className={'circle'}         
            style={scaleX: scrollYProgress}      //this component will be resized based on the current value of scrollYProgress                                     
          />
    )    
}



//VIEWPORT ANIMATION: animation that occurs when the element is first seen in the viewport

function Circle() {
    return(
          <motion.div 
            className={'circle'}    
            initial={{opacity : 0}}
            whileInView={{opacity: 1, transition: {duration: 0.7}}}   
            viewport={{once: true}}                  //scrolling animation will only occur once
            onViewportEnter={(entry) => {}}          //function that is fired when the element appears in the viewport (Provides the IntersectionObserverEntry with details of the intersection event)
            onViewportLeave=((entry) => {})          //function that is fired when the element leaves the viewport  (Provides the IntersectionObserverEntry with details of the intersection event)
          />
    )    
}


              

//VIEWPORT PROPS: a prop that enables us to customize the scrolling behavior

function Circle() {
    const containerRef = useRef();

    const amount = useMemo(() => {                           //this is a good way to define the amount prop based on the size of the viewport
          if(mobile)
              return 0.3;
          else if (tablet)
              return 0.6;
          else 
              return 0.8;
    }, [mobile, tablet])
  
    return(
        <div ref={containerRef} style={{overflow: 'hidden'}}> //(this must have a scroll bar)
            <motion.div 
              initial={{opacity: 0}}
              whileInView={{opacity: 1}   
              viewport={{
                  once: true,           // animation will only occur once
                  root: containerRef,   // by assigning a ref object here, the container that has this same ref will act as the viewport
                  margin: '100px',      // The more margin, the longer it will take for the viewport to see the element, the less margin, the less it will take to see the element in the viewport                       
                  amount: 0.6,          // define the percentage of the element that has to be in view for the scrolling animation to occur        
              }}                
            />
       </div>
    )
}
  














//========================================================================================= LAYOUTS ==============================================================================================
// The layout prop in the motion component can add animation to a grid or flex box
// Layout animations are triggered when a component re-renders and its layout has changed (items are removed, re-arranged, or added)
// keep in mind, sometimes the child components will have distortion that occurs when the animation occurs
// to remove this distortion, you can set layout as a prop to the child components
// if there is a property that you dont want to animate with layout, you will need to set the inline styles for that property style={{borderRadius: 20}}


function App() {
    const [list, setList] = useState();

    return(
        <motion.div className={'grid'} layout transition={{duration: 0.8}}>        //by using transition={layout: { duration: 0.3 }} you are setting the duration ONLY for the layout animation
             <motion.div className={'box'} layout></motion.div>    
             <motion.div className={'box'} layout style={borderRadius: 20}></motion.div>    
             <motion.div className={'box'} layout></motion.div>
        </motion.div>    


        <motion.div className={'gridWithScroll'} layoutScroll style={{overflow: 'scroll'}}>    //if your grid has a scroll bar, you must use the style and layoutScroll prop    
             <motion.div className={'box'} layout></motion.div>    
             <motion.div className={'box'} layout></motion.div>    
             <motion.div className={'box'} layout></motion.div>
        </motion.div>    
    )
}


//LAYOUT-GROUP: This component ensures that when one component has its layout changed, the other layouts will be smoothly moved
/* 
    [accordion]                  [accordion]
    [accordion]                      content
                                     content
                                  [accordion]              //this accordion will have an animation when its pushed down
*/

function Accordion() {                                      //this component will display a drop down
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}>
        <motion.h2 layout>header</motion.h2>
        {isOpen ? 'content' : null}
    </motion.div>
  )
}

function App() {                                           // with LayoutGroup, the accordion on the bottom will be pushed down smoothly
  return (                                                 // when the accordion on the top is spread open
    <LayoutGroup>          
      <Accordion />
      <Accordion />
    </LayoutGroup>  
  )
}
    



//LAYOUT-ID: When a new component is added that has a layoutId prop that matches an existing component, 
//it will automatically animate out from the old component.
//MAKE SURE TO DISABLE TRANSITION CSS PROPERTY ON THE ELEMENTS THAT HAVE LAYOUTID
//ALSO MAKE SURE TO USE THE KEY PROP ON THE MOTION COMPONENT WITH LAYOUTID THAT HAS A IMG ELEMENT AS A CHILD ELEMENT TO AVOID VISUAL BUGS

/* 
     [ ________             ]        

              |
              |            //there will be an animation that occurs here
              v
     
     [           __________ ]
*/

function App() {
  const [example, setExample] = useState(false)

  return (
    <div className={'container'}>
        <div className={'box'}>
          {example && <motion.div className={'line'} layoutId="underline" />  }   // this line will move to the element on the bottom when it's removed from the dom
        </div>
        <div className={'box'}>
          {!example && <motion.div className={'line'} layoutId="underline" />  }  //this line will move to the element on the top when it's removed from the dom
        </div>
    </div>

  )
}
    


















//========================================================================================== HOOKS ======================================================================================
const x = useMotionValue();              // motion values are objects that are assigned to the style attribute of elements
                                         // they are used to keep track of a specific css property
                                         //in this case, x will keep track of the elements position on the x-axis
                                         // you can assign x to one of the hooks below to apply a different animation to a different css property


const {scrollYProgress,                   //current value of the y-axis scroll position
       scrollXProgress                    //current value of the x-axis scroll position
      } = useScroll();                    //returns a motion value that contains data about the scrolling position of the webpage


const scaleX = useSpring(x, {            // useSpring() accepts a motion value and will return another motion value
    stiffness: 100,                      // the returned motion value will be used to create an animation that resembles a spring
    damping: 30,                         //in this example, any changes made to x will make scaleX grow or shrink
    restDelta: 0.001
})


const background = useTransform(         //useTransform() accepts a motion value and will return another motion value
    x,                                   //the returned motion value will be used to create an animation that changes the background color
    [-100, 0, 100],                                                // we map these values            
    ["linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",  //to these values
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"]
  )


              
const dragControls = useDragControls();   //useDragControls() can drag an element A by click on another element B
const startDrag = (e) => {                //you will need an event handler that calls the start() function
    dragControls.start(e, {snapToCursor: true})//the start() function will drag the element B
}
    <button onPointerDown={startDrag}>      //Element A calls the event handler
       click me
   </button>
   <motion.div 
      className={'box'} 
      dragControls={dragControls}          //Element B will be dragged
    />
              


const [x, cycle] = useCycle({x : -100}, {x: 120});            //hook that lets you cycle between two animations

    <div animate={x} onTapStart={() => cycle()} onTapEnd={() => cycle()}>
                
    </div>











//==================================== useScroll() and useSpring() ====================================================

/*  
    useSpring() is a hook that returns a motion value and will animate a certain css property based on stiffness, damping and restDelta props
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
//useMotionValue returns a motion value, a variable that keeps track of the changes of a specific css property
//Basically, you can change an Element A by assigning a motion value to Element B, any changes made to element B will affect Element A

import {motion, useMotionValue, useTransform } from 'framer-motion';

function App() {
  const x = useMotionValue(0);                          //this motion value will keep track of changes in the x-axis of an element
  const background = useTransform(                      //useTransform() will use the motion value and create animations based on the current value
    x,
    [-100, 0, 100],                                     // if x is -100, then we will animate to the first linear gradient in th 
    ["linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)"]
  )

  return(
      <motion.div className={'container'} style={{background}}> //the background color will change as you drag the child element
          <motion.div 
            className={'box'} 
            style={{x}}                                 //you must assign the motion value to the style prop
            drag='x'                                     //when this component is dragged, it will cause changed to the motion value
            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}>
          </motion.div>      
      </motion.div>
  )
}



//useTransform() with functions
function TransformWithFunctions() {
    const count = useMotionValue(0)
    const rounded = useTransform(count, latest => Math.round(latest))    //passing a function to the second argument can be used to format the motion values
    const [,animate] = useAnimate();
  
    useEffect(() => {
        const controls = animate(count, 100, {duration: 1.2})
        return controls.stop
    }, [])
    
    return <motion.div>{rounded}</motion.div>
}




































