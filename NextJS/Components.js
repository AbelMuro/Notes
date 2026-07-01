
//--------------------------------------------- HTML COMPONENT ---------------------------------------------
/* 
    Html component can be used to modify the <html/> tag in your html file

        1) You can set attributes to your <html/> tag  

        2) You can dynamically change data about the <html/>

        3) this component optimizes your app for SEO

        4) this component should only be used inside _document.js

*/

import { Html } from 'next/document';

export default function Document() {
  return (
        <Html lang="en">
        </Html>
  );
}





//--------------------------------------------- HEAD COMPONENT ---------------------------------------------
/* 
         Head component can be used to modify the <head/> tag in your HTML with meta data about the application

            1) this component can help with SEO 
            
            2) this component can let you dynamically update the meta-data of the application

            3) Keep in mind, that you can use the <Head/> component for every page.
*/


import Head from 'next/head';

export default function Home() {
    return(
        <>
            <Head>
                <title>My Awesome Page</title>
                <meta name="description" content="This is an awesome Next.js page." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
    )
}







//--------------------------------------------- MAIN COMPONENT --------------------------------------------- 
/*     
        Main component will load all the components that you wrote in your next.js app
        This can be useful for applying global options for your components
        This component should only be used in the _document.js page
*/


import { Html } from 'next/document';

export default function Document() {
  return (
        <Main/>
  );
}






//--------------------------------------------- NEXT SCRIPT COMPONENT ---------------------------------------------
/* 
    NextScipt component will load all the javascript code that makes your app interactive.
    All the event handlers, useEffects, state, props, etc..., will be loaded with this component.
    The placement of this component matters, it must be placed inside the <body> tag and after the 
    <Main/> component

    NextScript component should only be used in the _document.js page route.
*/


import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>





//--------------------------------------------- LINK COMPONENT ---------------------------------------------
/* 
    Link component can be used for optimized navigation within your application. Only use this 
    component to navigate to the pages in your next.js app.

        1) this component will provide fast client-side navigation

        2) this component will not create a full page reload

        3) this component will pre-load the pages in the background when the <Link> appears in the viewport

*/

import Link from 'next/link';

function Home() {
    return (
        <Link href="/aboutUs" className={'link_styles'}></Link>
    )
}






//--------------------------------------------- IMAGE COMPONENT ---------------------------------------------
/* 
        The <Image/> component lets next.js optimize an image for performance

            1) The component will format the image into Webp or any modern format if its supported by the browser.  
    
            2) This component will also generate multiple versions of an image and serve the most appropriate 
               version based on the user's device. 
               
            3) this component will lazy-load the image
    
            4) this component will optimize the image for SEO

        You should use this component for most images, but not for icons, images fetched from a server, or SVG

        /public
             /images
                profile.jpg             /images/profile.jpg
*/

import Image from 'next/image';

export default function Home() {
    return(
            <Image 
                src='/images/profile.jpg'                               //keep in mind that the images must be in the public folder, Next.js will automatically search in the public folder
                height={144}
                width={144}
                alt={'Your Name'}
                priority                                                //this will make the image load faster, images by default are lazy loaded
                />
    )
}







//---------------------------------------------  SCRIPT COMPONENT ---------------------------------------------
/* 
    Script component can be used to load a third-party libraries with CDN 

        1) this component loads the library faster compared to the <script/> tag in HTML

        2) this component optimizes the scripts for SEO

        3) this component loads the script but doesn't block rendering

        4) this component can also decide when to load the CDN;
           beforeInteractive, afterInteractive, lazyOnload
*/


import Script from 'next/script';

export default function Home() {
    return(
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="beforeInteractive   or  afterInteractive   or   lazyOnload"
                onLoad={() => console.log(`script loaded correctly, window.FB has been populated`)}
            />
    )
}
