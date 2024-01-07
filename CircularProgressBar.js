/* 
                      KEEP IN MIND: the progress bar created with SVG will utilize 'strokeDasharray' and 'strokeDashoffset'  
                      finding the correct percentages with these properties will be tricky

                      .progressBar{
                          width: 339px;
                          height: 339px;
                          transform: rotate(-90deg);                //you may want to rotate the svg container to make sure the circle starts at designated areas
                      }
                      
                      .progressBar > circle{
                          fill: none;                               //this property will color the inside of the circle
                          stroke-width: 15px;                       //this property will set the width of the 'border' of the circle
                          r: 159;                                   //radius of the cirle, you want to multiply this value by 2 to get the full width and height of the circle
                          cx: 50%;                                  //position of the circle in the x-axis of the SVG container, set to 50% to center it
                          cy: 50%;                                  //position of the circle in the y-axis of the SVG container, set to 50% to center it
                          stroke-linecap: round;                    //this will define the shape at the ends of the paths, in this case, the ends of the circle will be rounded
                      }


*/



//newPercentage will be a number between 0 and 100
function ProgressBar({newPercentage}) {
    const [percentage, setPercentage] = useState('1000');                        //1000 represents 0%            500 represents 50%          0 represents 100% 

    useEffect(() => {
          setPercentage(1000 - (newPercentage * 10))                            //if newPercentage = 25, then we multiply it by 10 and get 250, then we subtract the result from 1000 and get 750,     so 750 is 25% of 100%
    }, [newPercentage])

    return(
        <svg 
            className={styles.progressBar} 
            xmlns='https://www.w3.org/2000/svg' 
            version='1.1'>
                <circle strokeDasharray='1000' strokeDashoffset={percentage}/>      //keep in mind that strokeDasharray MAY need to use a different value than 1000, depending on the size of the circle
        </svg>  
    )
}

export default ProgressBar;
