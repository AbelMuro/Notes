//To convert markdown to html, use the Showdown.js library
//npm install -D react-showdown

import MarkdownView from 'react-showdown';

function Markdown() {
    let text = '# Hello World'
  
  
    return(
      <div className='markdown'>
           <MarkdownView markdown={text}/>
      </div>
    )
}

/* 
  if you want to style the html, you will need to use the following selectors

  .markdown div h1 {
  
  }

  anything after the div in the selector must be the tag that you are styling

*/
