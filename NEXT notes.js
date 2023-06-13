/*  Next.js is a framework for React. A framework is a collection of pre-written JavaScript code libraries 
        that provide developers with pre-written JS code to use for routine programming features and tasks

    Next.js has client-side routing, the pages folder automatically creates a URL for each js file
    Next.js has pre-fetching, when a Link component is on the view port, Next.js will pre-load the page in the background before the user clicks on the link
    Next.js does code-splitting automatically, so each page only loads what’s necessary for that page 




    steps for initializing Next.js
    
    1) npm init -y
    
    2) npm install --save react react-dom next
    
    3) use the following scripts for package.json
    
          "dev": "next dev",
          "build": "next build",
          "start": "next start",
          "lint": "next lint"
          
    4) create a pages folder in the root of the directory and create an index.js
    
          pages
             index.js               /
             posts
                first-post.js      /posts/first-post
                second-post.js     /posts/second-post
             about-me              /about-me

      5) create a public folder in the root of the directory (this will be used for static files, images, icons, etc..)

*/




//============================================================ LINK COMPONENT ============================================================================================
// Link component is used to navigate between the pages in a Next.js app


import Link from 'next/link';

export default function FirstPost() {
  return (
      <h2>
        <Link href="/"> 'Back to home' </Link>
      </h2>
  );
}












