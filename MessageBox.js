/* 
  The component below will display a message box when you hover over it */

      <MessageBox 
           message={'Hello World'}
           Component={({children, onMouseEnter, onMouseLeave}) => {          //render props
                return (
                    <p onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                         'When you hover over this text, a message box will appear'
                         {children}                                                            //this is the actual message box that will appear
                    </p>
                )
            }}/>



import React, {useState, useEffect} from 'react';
import * as styles from './styles.module.css';

function MessageBox({message, Component}) {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);    
    }

    const followMouse = (e) => {
        const follower = messageBoxRef.current;
        follower.style.left = `${e.pageX}px`;                  //e.pageX will get the mouse X-coordinates
        follower.style.top = `${e.pageY}px`;                   //e.pageY will get the mouse Y-coordinates
    }


    useEffect(() => {
        if(hover)
            document.addEventListener('mousemove', followMouse);
        else
            document.removeEventListener('mousemove', followMouse);

        return () => {
            document.removeEventListener('mousemove', followMouse);
        }
    }, [hover])


    return (
        <Component onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {hover &&
                <div className={styles.messageBox}>
                      {message}
                </div>
            }            
        </Component> 
    )
}
