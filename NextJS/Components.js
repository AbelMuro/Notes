
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
