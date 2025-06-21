/* 
            Framer-motion is an animation library used to create animations for React
            npm install framer-motion

            Bookmarks
                  1) Declarative Animations: Motion Component 
                        1.1) initial and animate prop
                        1.2) transition prop
                        1.3) variants prop
                        1.4) dynamic variants
                        1.5) exit prop
                        1.6) gestures props
                        
                  2) Imperative Animation: Animation Hooks
                        2.1) useAnimate() hook
                        2.2) useAnimationControls() hook
                        2.3) useCycle() hook
                        
                  3) Declarative Animations: Draggable Props
                        3.1) Draggable Components
                        3.2) Draggable Components with constraints
                        3.3) Draggable Components using Parent Components as Constaints
                        3.4) Drag and Drop Components
                        3.5) Miscellaneous Draggable Props
                        
                  4) Imperative Animations: Draggable Hooks
                        4.1) useDragControls() hook
                        
                  5) Declarative Animations: Scrolling Props
                        5.1) whileInView props
                        5.2) viewport props
                        
                  6) Imperative Animation: Scrolling Hooks
                        6.1) useScroll() hook

                  7) Declarative Animation: Grid/Flex Animation
                        7.1) layout prop
                        7.2) layoutScroll prop
                        7.3) LayoutGroup component
                        7.4) layoutId prop

                  8) Imperative Animation: Motion Value Hooks
                        8.1) useMotionValue() hook
                        8.2) useMotionValueEvent() Hook
                        8.3) useSpring() hook
                        8.4) useTransform() hook



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
                 key='1'                                                      // key prop is required for img tags or any element that has a img as a child
                 initial={backgroundColor: 'white', x: 0} 
                 animate={                                                
                        backgroundColor: 'red', 
                        x: [-100, -50, 0, 50, 100, 150]                        //will animate through an array of values
                 }
                 onAnimationComplete={() => {}}>                                //calls a functions once the animation is complete           
            </motion.div>
     )
}




//-------------------------- Transition Prop
/* 
            The transition prop is used to control and specify
            how an animation will take place. Keep in mind, that
            certain transitions, like staggerChildren, require variants
            to work
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

              type: 'keyframes',                                // Sequence-based animation (typically used for animating css properties through an array)

              repeat: 1, 2, 'Infinite',                         // the number of times the transition will occur
              repeatType: 'loop, reverse, mirror',              // loop repeats the animation from the start, reverse alternates between forward and backwards playback
              repeatDelay: 0.3,                                 // the delay between each repeating transition  

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
            You can simplify your code by using variants. Keep in mind, 
            the parent component has to trigger the animations first,
            then the child components animations are triggered
*/
const item = {
      hidden: { 
            opacity: 0,
      },
      visible: {  
            opacity: 1,
            transition: {  
              when: "beforeChildren or afterChildren",          // parent component transitions will finish before or after childrens transition
              delayChildren: 0.2,                               // similar to the property above, but it offers a more precise delay 
              staggerChildren: 0.1,                             // first child will be delayed by 0.1, the second child delayed by 0.2, the third child delayed by 0.3 (requires variants to work)
              staggerDirection: -1,                             // direction in which the children are delayed, -1 means the last child is delayed by 0.1, the second to last child is delayed by 0.2...     
            },
      }
}


function App() {
    return (
        <motion.div
            initial="hidden"                        // framer-motion will get the 'hidden' property from the 'item' object and assign it to this prop       
            animate="visible"                       // framer-motion will get the 'visible' property from the 'item' object and assign it to this prop
            variants={item}                         // you must assign the object that contains the css properties here             
        >
              <motion.div                                            
                  variants={otherVariant}            // the initial and animate prop will automatically be set by framer-motion, 
               />    
        </motion.div>
    )
}




//-------------------------- Dynamic Variants Prop
/* 
            You can also use variants dynamically by using a callback
*/
const item = {
      hidden: {  
            opacity: 0,
      }.
      visible: i => ({                        
             opacity: 1,
             transition: {
                delay: i * 0.3,
      }) 
}

function App(){
    return(
            array.map((val, i) => {
                 return(
                        <motion.div
                              custom={i}                                    //custom prop is used to pass a value to the dynamic variant callback
                              initial="hidden"                           
                              animate="visible"                       
                              variants={item}>                                 
                       </motion.div>
                 )       
            })
    )
}                  



//-------------------------- Exit Prop
/* 
            The exit prop is used to create 'exit' animations.
            In other words, before the component is unmounted,
            it will go through one final animation. Keep in mind,
            that the 'exit' prop will only work if you wrap the component
            with AnimatePresence
*/
import {motion, AnimatePresence}

function App() {
    const [remove, setRemove] = useState(false);

    const handleClick = () => {
        setRemove(!remove);
    }

    return(
        <>
            <AnimatePresence initial={false}>           // you can set initial to false to skip the first initial animation
                 {
                 remove &&  
                      <motion.div                      
                           initial={opacity: 0}
                           animate={opacity: 1}
                           exit={opacity: 0}           // the exit prop will use the exit property from the object in variants
                  />
                  } 
            </AnimatePresence>
            <button onClick={handleClick}>
                Remove from dom
            </button>                            
        </>     
    )
}



//-------------------------- Gestures
/* 
            Gestures are event handlers that trigger animation
            when the event is triggered. These props will accept
            an object with css properties

            Event handlers that start with 'while' will provide a built 
            in way of creating an animation

            Event handlers that start with 'on' are more optimized for
            creating animations. They trigger animations more smoothly
            compared to the default event handlers in React
*/

function App() {
  return (
       <motion.div 
          initial={{opacity: 0}}

          whileHover={{scale: 1.2, transition: {duration: 2}}}   
          onHoverStart={(e) => {}}                 //function that fires when the user hovers over the element
          onHoverEnd={(e) => {}}                   //function that fires when the users mouse leaves the element

          whileTab={{scale: 0.9}}                  //gesture for click events
          onTabStart={(e, info) => {}}             //function that fires when the tab start on the element (info = {point: {x, y}})
          onTabCancel={(e, info) => {}}            //function that fires when the tab ends (info = {point: {x, y}})

          whileInView={{opacity: 1}}               //gesture for elements that first appear in the viewport
          viewport={{once: true}}                  //the whileInView gesture will only run once
          onViewportEnter={() => {}}               //function that fires when the component first enters the screen
          onViewportLeave={() => {}}               //function that fires when the component leaves the screen

          whileDrag={{color: 'red'}}               //gesture for elements that are currently being dragged
          onDragStart={(e, info) => {}}            //function that fires when the user starts dragging the element
          onDragEnd={(e, info) => {}}              //function that fires when the user stops dragging the element

          whileFocus={{scale: 1.2}}                //gesture for input elements or any element that receives focus

          onPanStart={(e, info) => {}}             //function that fires when the user presses down on an element and then moves away at least 3 pixels  (info = {point: {x, y}})  for mobile -> touch-action: none; this will disable pan on mobile device
          onPanEnd={(e, info) => {}}               //function that fires when the user stop panning
      />          
    )
}



















//======================================================== IMPERATIVE ANIMATIONS: Animation Hooks ================================================================================================

//-------------------------- useAnimate() 
/* 
            useAnimate() can be used to create complex animations. 
            The hook retuns a ref object that can be assigned to a component,
            and also returns a function that returns a callback that can
            be used to trigger animations

            syntax:
                        const [ref, animate] = useAnimate();

                        const promise = animate(selector, animateTo, transition)                       //returns a promise

                                 selector = can be any valid css selector, can also be a ref object returned from useAnimate()
                                 animateTo = an object that has css properties, the element will animate to these values
                                 transition = an object that has the transition properties for the animation
*/


import {useAnimate} from 'framer-motion';

function App() {
    const [ref, animate] = useAnimate();    

    const createSequenceAnimation = async () => {
          await animate(ref.current, { x: 0 }, {duration: 0.5})                      
          await animate(ref.current, { x: 100}, {duration: 0.5, delay: 2})                   
          await animate(ref.current, { x: 20}, {duration: 0.5})
          await animate('div', {y: 45}, {duration: 0.4})                                   // you can also use any valid css selector in the first argument
    }

    const stoppingAnimation = () => {
          const animating = animate('#box', {y: -20});
          animate.stop();                                                                  // you can stop an animation with the .stop() method
    }

    return( 
            <>
                <div ref={ref}></div> 
                <motion.div ref={ref}></div>
            </>
       
            
    )
}




//-------------------------- useAnimationControls()
/* 
            useAnimationControls() hook lets you create complex animations.
            This hook also provides a way to start and stop animations.

            const controls = useAnimationControls();

            controls.start();                        //starts an animation , returns a promise
            controls.set();                          //instantly sets a css property and skips the animation, does NOT return a promise
            controls.stop();                         //stops the ongoing animation, does NOT return a promise
*/

function Animate() {
    const controls = useAnimationControls();  

    const animation = async () => {
            await controls.start({ scale: 2 , transition: {type: 'spring'}})                
            await controls.start('visible');                                                //you can trigger an animation from a variant object  
            await controls.start(custom => ({                                               //you can use a custom prop to pass data to this callback
                 scale: custom * 3       
            }))
            controls.set({backgroundColor: red});                                           //instantly sets a property and skips the animation
            controls.stop();                                                                //stops any ongoing animations
        }

    return (
            <motion.div 
               custom='3' 
               initial='hidden' 
               animate={controls}>
            </motion.div> 
      )
}


//-------------------------- useCycle() hook
/* 
            useCycle() hook is similar to useState(), it is used to toggle between two different sets of styles
*/


function App() {
    const [toggle, setToggle] = useCycle(false, true);               //toggle will have either true or false as the values, setToggle() is a function used to toggle between true and false

    const handleClick = () => {
        setToggle();
    }

    return(
        <>
            <motion.div
                initial={false}                                          // we have to set initial to false for useCycle to work here
                animate={toggle ? {color: 'red'} : {color: 'blue'}}>                             
            </motion.div>    

            <button onClick={handleClick}>                              //clicking on this button will toggle between the 'open' styles and the 'closed' styles
                click me
            </button>    
        </>

    )
}




























//======================================================== DECLARATIVE ANIMATIONS: Draggable Props ================================================================================================



//-------------------------- Draggable Components
/* 
       To make a component draggable, you only need to set the 'drag' prop
       you can set drag='x' or drag='y' to force the element to only drag on the x-axis or y-axis  
*/

function App() {
    return(
        <motion.div drag> </motion.div>
    )
}


//-------------------------- Draggable Components with constraints
/* 
       You can create constraints on a draggable component.
       The component can't be dragged past a certain constraint
*/
function App(){
    return(
        <motion.div
            drag
            dragConstraints={{            
                  top: 50,                    // component can be dragged 50px to the top from the origin                        
                  left: 50,                   // component can be dragged 50px to the left from the origin  
                  right: 50,                  // component can be dragged 50px to the right from the origin  
                  bottom: 50,                 // component can be dragged 50px to the bottom from the origin  
            }}>
    )
}


//-------------------------- Draggable Components using Parent Components as Constraints
/* 
            You can use a parent component as a constraint for a 
            draggable child component. You can do this by assigning
            the same ref object to the parent component and to the child component's
            dragContraints prop. The child component won't be able to be dragged
            outside the parent component
*/

function App() {
       const constraint = useRef();     

       return (
            <motion.div ref={contraint}>       
                   <motion.div
                         drag
                         dragConstraints={constraint}
                   />
            </motion.div>
       )
}




//-------------------------- Drag and Drop Components
/*
            You can use the 'onDragEnd' prop to see if a dragged component
            has been dropped on top of a drop zone. Then you can add the 
            dragged component as an item to a list with the useState() hook, 
            and then use the drop zone to display all items that have been dropped.
*/
function DragDropExample() {
  const [droppedItems, setDroppedItems] = useState([])

  const isOnDropZone = (e, info) => { 
       const dropZone = document.getElementById("drop-zone").getBoundingClientRect();
              
       if(info.point.x >= dropZone.left && info.point.x <= dropZone.right && 
          info.point.y >= dropZone.top && info.point.y <= dropZone.bottom)
              setDroppedItems([...droppedItems, 'new item'])     
  }

  return (
    <div>
      <motion.div drag onDragEnd={isOnDropZone}>
             Drag Me
      </motion.div>

      <motion.div id="drop-zone">
            Drop Here
            {droppedItems.map(() => {})}
      </motion.div>
    </div>
  );
}



//-------------------------- Miscellaneous Draggable Props

function App() {         
    return(
        <motion.div     
            dragSnapToOrigin={true}        // this will force the element to go back to its origin when the user stops dragging the element
            dragElastic={1}                // must be a value between 0 and 1; the degree of movement allowed outside of constraints
            dragMomentum={true}            // applies momentum (element keeps moving) when the user stops dragging the element
            dragPropagation                // if a child component is dragged, it will also drag the parent component with it
            dragListener={false}           // setting this to false will ensure that this element can ONLY be dragged using useDragControls()
            dragTransition={{              // applies an animation when the user lets go of the draggable element and hits one of the contraints
                bounceStiffness: 600,      // the animation takes the form of a spring
                bounceDamping: 10 
            }}
          />
      )
}



















//======================================================== IMPERATIVE ANIMATIONS: Draggable Hooks ================================================================================================


//-------------------------- useDragControls()
/* 
            You can use the useDragControls() hook to control when and how a component 
            can be dragged. Instead of relying on the user manually dragging the component,
            you can programmatically enable the dragging.

            const dragControls = useDragControls();   // dragControls must be assigned to the dragControls prop of the component you want to enable dragging

                        dragControls.start();         // start() method enables dragging on a component
                        dragControls.end();           // end() method prevents dragging on a component
                        dragControls.isDragging;      // isDragging property tells you if the component is currently being dragged
*/

function DragControls () {
  const dragControls = useDragControls();

  const startDrag = (e) => {
      dragControls.start(e, {snapToCursor: true})
  }
  
  return(
      <button onPointerDown={startDrag}>            
          Click here to enable dragging
      </button>
      <motion.div 
        className={'box'} 
        dragControls={dragControls}
        dragListener={false}                        // prevents default dragging, this component can only be dragged if the .start() method was called
      />
  )
}
























//======================================================== DECLARATIVE ANIMATION: Scrolling Props ================================================================================================



//-------------------------- whileInView Props
/* 
            You can use the whileInView props to enable animation when the 
            component first enters the screen
*/
function App() {
    return(
          <motion.div 
            className={'circle'}    
            initial={{opacity : 0}}
            whileInView={{opacity: 1, transition: {duration: 0.7}}}   
            onViewportEnter={(entry) => {}}          //function that is fired when the element appears in the viewport (Provides the IntersectionObserverEntry with details of the intersection event)
            onViewportLeave=((entry) => {})          //function that is fired when the element leaves the viewport  (Provides the IntersectionObserverEntry with details of the intersection event)
          />
    )    
}


              

//-------------------------- viewport Props
/* 
            You can use viewport props to customize the behavior of
            scrolling animation.
*/

function App() {
    const containerRef = useRef();
  
    return(
        <div ref={containerRef} style={{overflow: 'hidden'}}> //(this must have a scroll bar)
            <motion.div 
              initial={{opacity: 0}}
              whileInView={{opacity: 1}   
              viewport={{
                  once: true,           // animation will only occur once
                  root: containerRef,   // by assigning a ref object here, the container that has this same ref will act as the viewport
                  margin: '100px',      // The more margin, the longer it will take for the viewport to see the element, the less margin, the less it will take to see the element in the viewport                       
                  amount: 0.6,          // define the percentage of the element that has to be in view for the scrolling animation to occur  (0 to 1)      
              }}                
            />
       </div>
    )
}
  






















//======================================================== IMPERATIVE ANIMATION: Scrolling Hooks ================================================================================================
/* 
            You can use the following hook to get the scroll position of the body tag.
            You can also use the following functions to better utilize the useScroll() hook.


            1) You can use the following function to calculate the top and bottom thresholds of 
               an element. This is useful for starting a scrolling animation when the scrollbar
               touches the very top border or very bottom border of the element

                        const node = document.querySelector('#ContainerWithScrollingAnimation');
                        offsetFromTop = node.offsetTop;                                                // the space between the top border of the element and the top of the page
                        offsetHeight = node.offsetHeight;                                              // the full height of the element
               
                        const calculateScrollThreshold = (offsetFromTop, offsetHeight) => {
                            const scrollableHeight = document.documentElement.scrollHeight;              // the full height of the whole document 
                            const offsetFromBottom = offsetFromTop + offsetHeight;                       // we calculate the space between the bottom border of the element and the bottom of the page
                            const topScrollThreshold = offsetFromTop / scrollableHeight;
                            const bottomScrollThreshold = offsetFromBottom / scrollableHeight;
                        
                            return [topScrollThreshold, bottomScrollThreshold];                          // we return the thresholds as a value between 0 and 1
                        }

            2) You can use the following function to create a mapping between two ranges of values.
               This is useful for getting the scroll position and applying a transformation ONLY
               when the scroll position reaches a certain range

                           value = 0.12312     // current scroll position
                           x1 = 0.2            // when scroll position reaches 0.2
                           x2 = 0.4            // when scroll position reaches 0.4

                           y1 = 0              // motion value for width
                           y2 = 400            // motion value for width


                           const CreateMapping = (x1, x2, y1, y2, value) => {
                                 const numerator = (value - x1) * (y2 - y1);
                                 const denominator = x2 - x1;
                                 return y1 + (numerator/denominator);
                           }

            3) You can apply the scrolling animation and the functions above with the following hook

                            useMotionValueEvent(scrollYProgress, 'change', (value) => {
                                const lowerConstraint = 0;
                                const upperConstraint = 400;
                        
                                if(value < topScrollThreshold || value > bottomScrollThreshold) return;
                        
                                const mappedValue = CreateMapping();
                                width.set(mappedValue);                                     // width is another motion value that only gets updated when the scroll reaches a certain range
                            })

*/

//-------------------------- useScroll() hook
/* 
            You can use the useScroll() hook to get current progress of scrolling on the x-axis and y-axis
            of a container

            const { scrollYProgress, scrollXProgress, scrollY, scrollX } = useScroll()

                        scrollYProgress: is a motion value, (value is between 0 and 1) should be used with other motion value hooks
                        scrollXProgress: is a motion value, (value is between 0 and 1) should be used with other motion value hooks
                        scrollY: is a string representing the current vertical scroll position in pixels
                        scrollX: is a string representing the current horizontal scroll position in pixels
            
            ____________
            |          |
            |          |
            |          |            <--- if scroll bar is halfway, then scrollYProgress will be 0.5
            |          |
            |__________|
*/

function App() {
    const ref = useRef();
    const {scrollYProgress, scrollXProgress, scrollX, scrollY } = useScroll();                  // by default, this will get the current scrolling progress of the body tag
    const {scrollYProgress, scrollXProgress } = useScroll({container: ref});                     // this will get the current scrolling progress of a specific element
  
    return(
          <motion.div      
            ref={ref}
            style={{width: scrollY}}                                                          
          />
    )    
}




























//======================================================== DECLARATIVE ANIMATION: Grid/Flex Animation ================================================================================================
/* 
            You can also create animation for grids and flex boxes with the 'layout' prop
*/

//-------------------------- Layout Prop
/* 
            The 'layout' prop in the motion component can automatially add animation to a grid or flex box
            Layout animations are triggered when a grid's items has changed because of a re-render (items are removed, re-arranged, or added).
            If there is a property that you dont want to animate with layout, you will need to set the inline styles for that property
*/



function App() {
    const [list, setList] = useState();

    return(
        <motion.div className='grid' layout>       
             <motion.div className='box' layout/>          // setting layout to the child components can fix a distortion bug that occurs sometimes
             <motion.div className='box' layout/>  
             <motion.div className='box' layout/>
        </motion.div>    

    )
}


//-------------------------- LayoutScroll prop
/* 
            If a grid/flex container has a scrollbar, then you need to use the 'layoutScroll' prop
            to trigger animations when the items of the grid have changed
*/
function App(){
     return(
          <motion.div className={'gridWithScroll'} layoutScroll style={{overflow: 'scroll'}}>     
             <motion.div className={'box'} layout></motion.div>    
             <motion.div className={'box'} layout></motion.div>    
             <motion.div className={'box'} layout></motion.div>
          </motion.div>    
     )
}



//-------------------------- <LayoutGroup/> Component
/* 
    The <LayoutGroup/> component is wrapped around child components and is
    used to create smooth animation transitions between the children when one 
    child component changes its layout. Keep in mind, that the child components must
    have the layout prop for this to work, this includes the grand children as well. The most common technique used with
    the <LayoutGroup/> component is with accordians.

    
    [accordion]                  [accordion]
    [accordion]                      content
                                     content
                                  [accordion]            
*/

function App() {                                          
  return (                                                
    <LayoutGroup>          
         <Accordion />                                    //if the layout of this component changes..
         <Accordion />                                    //then this component will smoothly transition to make space for the other component
    </LayoutGroup>  
  )
}

function Accordion() {                                     
  const [open, setOpen] = useState(false)

   const handleOpen = () => {
       setOpen(!open);
   }
            
  return (
    <motion.div layout onClick={handleOpen>               //this component will expand when we click on it, triggering a smooth animation
        <motion.h2 layout> 'header' </motion.h2>
        {isOpen && 
            <div layout> 
                 'Content'   
             </div>
        }
    </motion.div>
  )
}




//-------------------------- LayoutId Prop
/* 
            The LayoutId prop creates an animated transition between two
            elements that have the same layoutId prop. If one element is removed
            from the DOM, and another element is added to the DOM, the LayoutId will
            create the animated transition of moving the removed element to the 
            new elements position.

                  <div> was unmounted
                 [ ________             ]        
            
                          |
                          |                        //there will be an animation that occurs here
                          v
                 
                 [           __________ ]
                             <div> was mounted
     
            If an element with the layoutId has a <img/> child element, make sure to use the key prop
            on the img tag to avoid any visual bugs
*/

function App() {
  const [state, setState] = useState(false)

  return (
    <>
        <div>
              {state && <motion.div layoutId="underline" />  }   // this element will make an animated transition to the div in the bottom when its removed from the DOM
        </div>
        <div>
              {!state && <motion.div layoutId="underline" />  }    // this element will make an animated transition to the div at the top when its removed from the DOM
        </div>
    <>

  )
}
    





















//======================================================== IMPERATIVE ANIMATION: Motion Value Hooks ================================================================================================
/* 
            Motion Values are objects that are used to keep track of a certain css property.
            Any changes made to a motion value will NOT cause a re-render, any DOM updates
            caused by motion values happen outside of the scope of React.
*/



//-------------------------- useMotionValue() Hook
/* 
            The useMotionValue() hook returns a 'motion value' that is assigned to the style
            attribute of elements. Keep in mind that the motion value should be the same name 
            of the css property that we want to keep track of. Each motion value object has a
            method .set() that can be used to programmatically set the value for the motion value

            const x = useMotionValue(initialValue, transition);
       
                        initialValue:  the initial value of the motion value
                        transition:    an object that accepts transition properties

                        x              the motion value as an object
                        x.set(200);    the set method allows us to instantly set a value for the motion value
                        x.get();       the get method allows us to get the current value of the motion value
                        x.on('change', () => {})  the on method allows us to create an event listener everytime there is a change in the motion value
            
*/

function App() {
    const x = useMotionValue(200);  
    const opacity = useMotionValue(0.7)

    return (
        <motion.div style={{x, opacity}}> </motion.div>
    )     
}
            


//-------------------------- useMotionValueEvent() Hook
/* 
            The useMotionValueEvent() is similar to the useEffect() hook in React.
            It lets you call a function when a certain motion value has changed. 
            You can apply additional animation logic with this hook

            syntax: 
                 useMotionValueEvent(motionValue, 'event-name', callback)

                             motionValue:   can be an object returned from useMotionValue(), useSpring(), useTransform() hooks
                             'event-name':  typically can be the 'change' event
                             callback:      function that has access to the latest value of the motionValue 
*/

function App() {
     const width = useMotionValue(0);

     useMotionValueEvent(y, "change", (latest) => {
         console.log("current value of width is: ", latest);
     });

     return (
        <motion.div style={{width}}> </motion.div>
    )         
}




//-------------------------- useSpring() Hook
/* 
            The useSpring() hook returns an motion value that is assigned to the style 
            attribute of elements. This hook will create a spring animation for those 
            css properties when the css property value changes.

            syntax:
                 const motionValue = useSpring(initialValue, transition);

                             motionValue.set()  can be used to programmatically set a motion value
                             initialValue:   can be any integer value or another motionValue
                             transition:     an object containing the transition properties for the spring animation
*/

function App(){
    const scale = useSpring(0, {                
           stiffness: 100,                      
           damping: 30,                         
           restDelta: 0.001
    })

    scale.set(20);
 
    return (
        <motion.div style={{scale}}> </motion.div>
    )
}



//-------------------------- useTransform() Hook
/* 
            The useTransform() hook returns a 'motion value' that is assigned to the style 
            attribute of elements. This hook will enable an animation for a css property when 
            another motion-value (that keeps track of a different css property) is changed.

            syntax: 
                 const motionValue = useTransform( otherMotionValue, [mapFrom], [mapTo], transition)

                             motionValue        the motion-value object that is assigned to the style attribute of elements
                             motionValue.set()  this method can be used to programmatically set a motion value
                             otherMotionValue:  this is a motion value returned from useMotionValue() hook
                             [mapFrom]:         this is an array of values that will be mapped to the third argument
                             [mapTo]:           this is an array of values that will be mapped to the second argument
                             transition: {      an object that accepts two transition properties
                                    ease:       must be an easing function imported from @popmotion/easing    
                                    clamp:      accepts a boolean value that indicates if the output values should stay within the confines of the specified range
                             } 


            This hook also accepts a callback on the second argument, you can use the callback 
            to change the syntax of the motion-value. This is useful for binding the motion-value
            to css properties that require additional information (some properties require units)
                        
                 const blurFilter = useTransform(otherMotionValue, (value) => `blur(${value}px)`)
                 const viewBox = useTransform([x, y], ([x, y]) => {})
*/


function App() {
    const x = useMotionValue(0);
    const opacity = useTransform(x, 
                        [0, 100],             // if 'x' is currently at 25
                        [0, 1]                // then 'opacity' will be at 0.25
    );
    opacity.set(15);
  

    return <motion.div style={{ x, opacity }} />;
}









