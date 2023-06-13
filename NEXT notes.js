/*  Next.js is a framework for React. A framework is a collection of pre-written JavaScript code libraries 
        that provide developers with pre-written JS code to use for routine programming features and tasks

    Next.js has client-side routing, the pages folder automatically creates a URL for each js file
    Next.js has pre-fetching, when a Link component is on the view port, Next.js will pre-load the page in the background before the user clicks on the link
    Next.js does code-splitting automatically, so each page only loads what’s necessary for that page 
    Next.js has built in support for CSS and SASS
    Next.js has on-demand image optimization, This allows for resizing, optimizing, and serving images in modern formats like WebP when the browser supports it.
    Next.js lazy loads images by default

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
        <Link href="/"> 'Back to home' </Link>
  );
}






//========================================================= IMAGE COMPONENT ============================================================================================
// Image component is used to display images in Next.js. It will automatically be optimized for different viewports and accepts all image formats


/* 
        public
             rose.jpg                   /rose.jpg
             images
                profile.jpg             /images/profile.jpg


*/

import Image from 'next/image';

export default function Home() {
    return(
        <>
            <Image 
                src='/images/profile.jpg'                               //keep in mind that the images must be in the public folder, Next.js will automatically search in the public folder
                height={144}
                width={144}
                alt={'Your Name'}
                />
        </>
    )
}






//======================================================== HEAD COMPONENT =========================================================================================================
//Head component can be used to include meta data for the web app, such as the <title> and <link> tags

import Head from 'next/head';

export default function Home() {
    return(
        <>
            <Head>
                <title>
                    'My next.js app'
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
    )
}










//===========================================================  SCRIPT COMPONENT =============================================================================================
// Script component can be used to load a third party library with CDN


import Script from 'next/script';

export default function Home() {
    return(
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() =>
                        console.log(`script loaded correctly, window.FB has been populated`)
                }
            />

    )
}



//========================================================== CSS in NEXT.js ==============================================================================================
//You can include css modules in Next.js in the same way as React

import styles from './styles.module.css';

export default function Layout({children}) {
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}


//this is how you include global css in Next.js... 
import '../common/styles.css';

export default function App({Component, props}) {                       //keep in mind that this component MUST be inside _app.js and also at the TOP LEVEL of the pages folder
    return(                                                             //NEXT.js will automatically use this component and pass every page to this component and share logic
        <Component {...props} />        
    )
}





