
//=========================================== REACT LISTS ================================================

/* 
        A React list is an array of JSX elements, each of these elements
        must have a key prop to help identify the item in the list.
        React will use the key to see which items in a list have changed.
        If the key of an item has changed, then the item will be re-rendered.
        But if the key doesn't change, then the item will be left alone.
        All keys should have unique values, and they should represent the data
        in the list.

        You should not use the index of the array as the key of an item for the reasons below..

        <ul>
                <li key=0 > 0 </li>        <---    lets say we delete this item from the list
                <li key=1 > 1 </li>
                <li key=2 > 2 </li>
                <li key=3 > 3 </li>
        </ul>


        -deleting an item will cause a re-render, but because we have to iterate through the list again
        every item will have a new key, thus re-rendering ALL 

        <ul>
                <li key=0 > 1 </li>                    // <li> 1 </li> used to have a key that was set to 1, but now it is 0
                <li key=1 > 2 </li>                    // all the list items have had their keys changed as well
                <li key=2 > 3 </li>                    // now React will look at this and will re-render all the items because their keys have changed
        </ul>

*/

   
function MakeList(props) {
    const [names, setNames] = useState(['david', 'carlos', 'stephanie'])
        
    return (names.map((name) =>
        <div key={name}> 
             {name} 
        </div>
    ));
}

