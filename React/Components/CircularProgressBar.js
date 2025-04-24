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
    const radius = 159;
    const circumference = 2 * Math.PI * radius;
    const [percentage, setPercentage] = useState(circumference);                        //0 represents 100%         circumference reprensents 0%

    useEffect(() => {
          setPercentage(newPercentage/100) * circumference);                            // if newPercentage is 25%, then we get 25% of circumference
    }, [newPercentage])

    return(
        <svg className={styles.progressBar}>
                <circle 
                      strokeDasharray={curcumference}                           
                      strokeDashoffset={percentage} 
                      r={radius}/>      
        </svg>  
    )
}

export default ProgressBar;
