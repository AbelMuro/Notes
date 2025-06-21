/* 
      Virtual scrolling is a technique that lets you display a certain number of items in a react list. This number will
      be dictacted by the scroll position, and will progressively display more items as the user scrolls down. This
      is useful for apps that have to display a large list that may impact performance.
*/


const ITEM_HEIGHT = 282;                                                   //its important to have a static height for every item in the grid
const VISIBLE_COUNT = Math.ceil(window.innerHeight / ITEM_HEIGHT) * 3;      //this will be the initial number of items that will be displayed, we multiply by 3 because we have 3 items on every row

function VirtualScrolling () {
    const [startIndex, setStartIndex] = useState(0); 
    const [visibleItems, setVisibleItems] = useState(projectData.slice(0, VISIBLE_COUNT));


    const handleScroll = () => { 
        const container = document.querySelector('.' + styles.container);
        let relativeScrollPosition = container.getBoundingClientRect().top;       //instead of using window.scrollY, you want to get the distance from the top of the container to the top of the viewport
        relativeScrollPosition = relativeScrollPosition > 0 ? 0 : Math.abs(relativeScrollPosition);
      
        const newIndex = Math.floor(relativeScrollPosition / ITEM_HEIGHT) * 3;     // formula used to calculate the new index that we can use to slice the array
        if(newIndex !== startIndex) { 
            setStartIndex(newIndex);                                             //we save a copy of the previous index
            setVisibleItems(projectData.slice(0, newIndex + VISIBLE_COUNT)); 
        } 
    }; 

    useEffect(() => { 
        window.addEventListener('scroll', handleScroll); 
        return () => window.removeEventListener('scroll', handleScroll); 
    }, []);

    return(
            <div className={styles.container_list}>
                {visibleItems.map((item) => {
                    return(<div>{item}</div>)
                })}               
            </div>             
    )
}
