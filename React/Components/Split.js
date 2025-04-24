//you can use the showdown library to create a container that has a bar in the middle, you can click and drag this bar to resize the child elements
//npm install react-split

import Split from 'react-split';


function Example() {
    return(
      <Split
            sizes={[50, 50]}                                //the initial size in percentage of both child elements
            minSize={[200, 200]}                            //the minimum size of each element in pixels
            gutterSize={20}                                 //the width of the bar that is used to resize the child elements
            gutterAlign="center"                            // center means that both child elements will be shrunk to make room for the bar, start will shrink the first element, end will shrink the second element
            snapOffset={50}                                 // this will give a snap effect when the bar is moved
            dragInterval={20}                               // Defaults to 1 for smooth dragging, but can be set to a pixel value to give more control over the resulting sizes
            cursor="col-resize"
      >
          <FirstElement/>
          <SecondElement/>
      </Split>
    )
}

/* 
    //you must define the following class selectors to make the bar visible

    .gutter {
        background-color: var(--gutter);                
        background-repeat: no-repeat;
        background-position: 50%;
        cursor: col-resize;
    }

    .gutter.gutter-horizontal {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
    }


*/
