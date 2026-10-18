/* 
                        KEYS


            In React, every JSX element can have a KEY prop. This KEY prop identifies 
            the element and helps React with its reconciliation algorithm.
            If the KEY prop is updated and a re-render occurs, then the element will be unmounted and remounted
            If the KEY prop stays the same and a re-render occurs, then only parts of the element will be updated
*/



function App(){
    return (
      <div key={'my-key'}>
      
      </div>
    )
}
