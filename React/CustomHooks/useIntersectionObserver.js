import { useEffect, useRef, useState } from 'react'; 

/* 
    This hook will observe an element and will let the developer know if the element is within the viewport


    props:

    -callback = (entries) => {             //this callback will check all the elements being observed and will see if these elements are 'in view'
            entries.forEach(entry => {     // entry = { intersectionRatio: 0.02134, isIntersecting: true, ....}
                if (entry.isIntersecting)  //keep in mind that as you scroll down a large element, 'intersectionRatio' will return a smaller and smaller number  0.123 -> 0.0123, this number MUST be greater than the threshold for .isIntersecting to return true 
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
