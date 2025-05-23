/*  
    Next.js is a framework for React. A framework is a collection of pre-built tools, rules, and structure
    that helps developers develop applications and website. In other words, frameworks contain pre-written 
    code that can be used by developers.


    Bookmarks
        1) Features
        2) Client-Side Routing (routing, dynamic routing)
        3) Client-Side Rendering 
        4) Server-Side Rendering
        5) Static-Site Generation
        6) Html Document (_document.js, Head component, Main component)
        7) Api Routes (dynamic routes)
        8) Hooks (useRouter())
        9) Misc Components (Link, Script, Image)



                                           FEATURES OF NEXT.JS


                                          CLIENT-SIDE ROUTING
            Next.js has client-side routing, the pages folder automatically creates a URL for each js file

                                          CLIENT-SIDE RENDERING (CSR)
            Next.js has client-side rendering, which means the application will be rendered on the browser after
            the server sends the html and javascript files. Client side rendering is best used for dynamic websites 
            where the data is always changing during runtime. 

                                        SERVER-SIDE RENDERING (SSR)
            Next.js also has server-side rendering, which means the applications will be rendered on the server
            before being sent to the browser. The process starts with the user requesting a SSR enabled page from 
            the server. The server will then fetch any necessary data from databases, API, and then generate the HTML.
            The HTML is then sent to the browser as a fully rendered page. Then the javascript is sent from the server 
            to the browser, making the page interactive. Server side rendering is often used for websites that rely on 
            new data everytime you refresh the page (News websites, E-commerce websites). SSR is also perfect for Search 
            Engine Optimization.

                                         STATIC-SITE GENERATION (SSG)
            Next.js uses static site generation, which means the applications will also be rendered on the server before
            being sent fo the browser. The HTML will be generated on the server during build time (when the server first 
            builds the next.js app). Next.js will then re-use the HTML with every request made to the server via a CDN. 
            The CDN will deliver the HTML to the browser. Afterwards, the server will then send the javascript to the browser 
            to make the page interactive. Static site generation is used on websites where the data doesnt change frequently
            (Blog websites, Portfolio websites). SSG is also perfect for Search Engine Optimization.

                                               CODE-SPLITTING
            Next.js will automatically do code-splitting. The bundle.js will be split into different files, each file will
            be loaded on the browser when necessary.

                                                 RESTful API
            You can create a Restful API within your Next.js application. Next.js is used primarily for the front end, but you 
            can make a full-stack appplication in Next.js with API routes. Restful APIs are implemented with API routes, and each
            of these API routes will be an endpoint. You can make a fetch request to any API route in your Next.js application. 
            In other words, the front-end will be in the /pages folder, and the back-end will be in the /api folder 
                 
                                                  COMPONENTS
            Next.js uses components to optimize certain features in an application.
    
    
    
    
    

    Steps for initializing Next.js
    
        1) npm init -y
        
        2) npm install --save react react-dom next
        
        3) use the following scripts for package.json
        
              "dev": "next dev",
              "build": "next build",
              "start": "next start",
              "lint": "next lint"
              
        4) create a /src folder in the root directory, and create a /pages folder inside the /src folder. 
           Then create an index.js and _app.js file inside the /pages folder
        
               /src
                  /pages
                     index.js               // entry to your app
                     _app.js                // used for client-side routing
    
        5)  The index.js file typically looks like this...
    
                import React from 'react';
    
                function App() {
                    return(<> hello world </>)
                }
    
                export default App;
    
         6) The _app.js file typically looks like this...
            (Next.js will use the _app.js to pass every page as props to this file)
    
                import '../common/styles.css';
                
                export default function MyApp({Component, pageProps}) {         //Component is the page that is passed down to this component
                    return(                                                     //pageProps is the getStaticProps() or getServerSideProps() from the page
                        <Component {...pageProps} />        
                    )
                }
    
    
         7) create a public folder in the root of the directory (this will be used for static files, images, icons, etc..)
    
         8) Next.js will follow the same process that React takes to develop an application
*/






















//============================================= CLIENT SIDE ROUTING =============================================
/* 
    By default, Next.js will assign a URL for every file in the ./pages folder of your app. The endpoint for the URL will be the name 
    of the file

        /pages
            index.js        /
            home.js         /home
            aboutus.js      /aboutus
            contactus.js    /contactus
            404.js          /404 page not found

    To navigate to a different page in Next.js you will have to use the <Link/> component
*/

import Link from 'next/link';

function App() {
    return {
         <Link href='/'> </Link>
         <Link href='/home'>  </Link>
         <Link href='/aboutus'>  </Link>
         <Link href='/contactus'>  </Link>
    }
}


//--------------------------------------------- DYNAMIC ROUTING ---------------------------------------------
/* 
    You can create dynamic routes in Next.js, which are basically links that are generated dynamically.
    To create a dynamic route, create a file name that starts with the following syntax..

        /pages
            [id].js                //catches a single variation of the url     /pages/hello    /pages/about
            [...id].js             //catches all variations of the url         /pages/1/2/3    /pages/2/3/4/5/6
*/


//      /pages/index.js
function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('URL').then(response => response.json()).then(data => setData(data));
    }, [])
    
    return(   
        <div>
            {data.map(data => <Link href={'/pages/${data.id}'}> CLick here </Link>}            <!-- [id].js -->
            <Link href={'/pages/1/2/3'}> Click Here </Link>                                    <!-- [...id].js -->
        </div>
    )
}



//     /pages/[id].js
import {useRouter} from 'next/router';

function DisplayData({post}) {
    const router = useRouter()
    const {id} = router.query;

    //you can make a fetch request with the id here
    
    return <></>
}


//      /pages/[...id].js
//    this dynamic route can catch all variations of the url 
import { useRouter } from 'next/router';

function Post() {
  const router = useRouter();
  const { id } = router.query;

    // id = ['1','2','3']      if the URL is   /pages/1/2/3
    // id = ['a', 'b']         if the URL is   /pages/a/b

  return <></>;
}



//--------------------------------------------- STATIC SITE GENERATION AND DYNAMIC ROUTING ---------------------------------------------
/*
    If you want your dynamic route to use static-site generation, you need
    to implement the function getStaticPaths(). This function will decide which
    dynamic routes will have static-site generation

    For more info on static site generation, scroll down for the Static Site Generation section
*/

    // 1) this function will be called first
        
            export async function getStaticPaths() {
                return {
                    paths: [{ params: {id: '1' } }, { params: {id: '2'}, {params: {id: ['a', 'b', 'c']}} }],      // the dynamic routes that have 1 and 2 will be statically generated            
                    fallback: false                                                                               // No additional paths will be generated dynamically   
                }                           
            }                                                  
                                                         
    // 2) then this function will be called second
        
            export async function getStaticProps(context) {
                 const id = context.params.id;                                          //you can use params to get the name of the dynamic route
                 const res = await fetch(`https://example.com/api/posts/${id}`);
                 const post = await res.json();
            
                 return {                                                               //returning the data that will be used by our component
                    props: {
                        post : post
                 }
              }
            }

    // 3) then finally the Post component will be called

        function Post({post}) {
            return {
                <section>
                    <h1> 
                        {post.title}    
                    </h1>
                    <p>
                        {post.author}
                    </p>
                </section>
            }
        }





















//============================================= CLIENT SIDE RENDERING =============================================
/* 
    Next.js will use client side rendering by default, assuming that you dont use 
    getServerSideProps() or getStaticProps() with your component. 

    You can use React hooks and classes in client side rendering
*/

function App() {
    const [state, setState] = useState()

    useEffect(() => {
        fetch('URL').then(response => response.json).then(data => setState(data));
    }, [])

    return <>
        state && state.name
    </>
}

























//==================================================== SERVER-SIDE RENDERING ==============================================================================
/*  
    SERVER-SIDE RENDERING is the pre-rendering method that generates the HTML on each page request. New HTML is generated for each page request.
    For a page to use server side rendering, the file needs to export getServerSideProps() from the file
    When a page uses server side rendering, Next.js will call getServerSideProps() to retrieve some kind of data. Once it has the data, it passes the data
    as props to the page. This process happens everytime the client makes a request to the server to view the page. In other words, everytime you refresh the page, 
    you are making another request to the server for the page's files. Doing so, will call the getServerSideProps() function everytime.

    DO NOT USE REACT HOOKS OR CLASSES IN SERVER-SIDE RENDERING
*/

export default function Home(props) {           //props is sent from getServerSideProps()
    const {userName, userEmail} = props;
    
    return (
        <main>
            {userName}
            {userEmail}
        </main>
    )
}

export async function getServerSideProps(context) {  
  const data = await fetch('url');
    
  return {
    props: {                                    //this object is passed as props to the Home component
        data
    },
  };
}

/* 
    context: {
            params: An object that contains route parameters for pages using dynamic routes. 
                    For example, if the page name is pages/posts/[id].js, then params will look like { id: ... }.
            preview: A boolean value that indicates whether the page is in preview mode or not.
            previewData: An object that contains the preview data set by setPreviewData().
            locale: A string that contains the active locale (if i18n is enabled).
            locales: An array that contains all supported locales (if i18n is enabled).
            defaultLocale: A string that contains the configured default locale (if i18n is enabled).    
    }
*/
























//============================================= STATIC SITE GENERATION =============================================
/* 
         STATIC GENERATION is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then re-used on each request.
         For a page to use static site generation, the file needs to export getStaticProps() from the file.
         When a page uses static site generation, Next.js will call getStaticProps() to retrieve some kind of data. 
         Once it has the data, it will be passed to the page as props. This process only happens once, and it happens during 
         build time.

         DO NOT USE REACT HOOKS OR CLASSES IN STATIC SITE GENERATION
         
*/



function Home(props) {           //props will be sent by getStaticProps()
    const {userName, userEmail} = props;
    
    return (
        <main>
            {userName}
            {userEmail}
        </main>
    )
}

export async function getStaticProps(context) {        
  const response = await fetch('url');             
  const data = await response.json();

  return {
        props : {data : data}                      //this object will be passed as props to the Home component
    }
}

/* 
    context: {
            params: An object that contains route parameters for pages using dynamic routes. 
                    For example, if the page name is pages/posts/[id].js, then params will look like { id: ... }.
            preview: A boolean value that indicates whether the page is in preview mode or not.
            previewData: An object that contains the preview data set by setPreviewData().
            locale: A string that contains the active locale (if i18n is enabled).
            locales: An array that contains all supported locales (if i18n is enabled).
            defaultLocale: A string that contains the configured default locale (if i18n is enabled).    
    }
*/


















//============================================= HTML DOCUMENT =============================================
/* 
      The page _document.js is used to modify the html document of your next.js application.

          /pages
              _document.js
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
      );
}



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
  );
}

























//====================================================== API ROUTES =============================================================
/* 
     API Routes let you create an API endpoint inside a Next.js app.
     The naming convention is: 
         /pages/api         
         /pages/api/login.js                  folder with the name api will use its files as the endpoints
         /pages/api/register.js

        Rules to know about API Routes
        
    1)  Do not fetch an API route from getStaticProps() or getStaticPaths()
    2)  API Routes do not specify CORS headers, meaning they are same-origin only by default 
    3)  You can use API routes to securely communicate with a third party api
         
*/



//  ---------------- /pages/api/login.js --------------------
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function handler(req, res) {         
    if(req.method !== 'POST'){
        req.status(405).send('Method not allowed');
        return;
    }
    
    const {email, password} = req.body;                          // will automatically parse the JSON into javascript
    const user = await User.findOne({email});                    // User.findOne() will search for the users account in the MongoDB database

    if(!user || !bcrypt.compareSync(password, user.pasword)){   //account validation
        res.status(401).send('Invalid Credentials');
        return;
    }

    const token = jwt.sign({ username: email }, 'SECRET_KEY', { expiresIn: '1h' });

    res.status(200).json({token});
}



// ------------------ /pages/index.js -------------------

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        fetch('/login', {
            method: 'POST'
            body: JSON.stringify({email, password});
            credentials: 'include'
        })             
    }

    return(
            <form>
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}> 
                <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}>
                <button onClick={handleClick}> Submit </button>
           </form>
    )
}




//---------------------------------------------DYNAMIC API ROUTES ---------------------------------------------
/* 
        API Routes can be dynamic, and follow similar convention to dynamic routes
        The syntax for dynamic api routes is below...

        /pages
            /api
                [endpoint].js                    //it doesnt have to be endpoint

*/       

// ---------------- /pages/api/[endpoint].js ----------------

export default function handler(req, res) {
  const { endpoint } = req.query;
  console.log(endpoint);                                        // if the URL is /123, then the endpoint = 123
}





// ---------------- /pages/index.js ----------------

export default function Home() {

    const handleClick = () => {
        fetch('/anythingGoesHere', {                            //this will make a fetch to the api endpoint in /pages/api/[endpoint].js
            method: 'POST'
            body: JSON.stringify({data: 'anything'});
        })             
    }

    return(
        <button onClick={handleClick}> Click Here</button>
    )
}















    
 //====================================================== HOOKS ======================================================


//--------------------------------------------- USE ROUTER() HOOK ---------------------------------------------
 // There is a hook called useRouter() in Next.js that returns a 'router' object that has data about
 // It can be used to get the current route, navigate between routes, and perform other operations related to routing  
    
import { useRouter } from 'next/router'

router.asPath            //returns the current path
router.push('/aboutme')  //will take you to a different page in the app
router.query             //this will return an object with the url parameters     (/pages/whatever?ID=1234      ->      {id: 1234}  )        will also return the name of the dynamic route

function ActiveLink() {
  const router = useRouter();
 
  const handleClick = () => {
    router.push('/aboutme');
  }
 
  return (
    <a  onClick={handleClick}>
      'Click Me'
    </a>
  )
}
 
export default ActiveLink


















//====================================================== MMISC COMPONENTS ======================================================

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




