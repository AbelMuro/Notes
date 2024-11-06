import { useEffect, useRef, useState } from 'react'; 

/* 
    props:

    -callback = (entries) => {             //this callback will check all the elements being observed and will see if these elements are 'in view'
            entries.forEach(entry => { 
                if (entry.isIntersecting) 
                    setInView(true); 
                else
                    setInView(false);
            }); 
        };
    
    -options = {threshold: 0.1}              //the percentage of the element that must be in the viewport, 0.1 is 10%
*/

const useIntersectionObserver = (callback, options) => { 
    const [target, setTarget] = useState(null);     //target is supposed to be a reference to an element
    const observer = useRef(null); 

    useEffect(() => { 
        const observer = new IntersectionObserver(callback, options); 
        target && observer.observe(target); 
        
        return () => target && observer.unobserve(target);  
         
    }, [target, callback, options]); 

    return setTarget;                       //the setTarget MUST be assigned to an element as a ref
}; 
