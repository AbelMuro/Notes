/*  
    Next.js is a framework for React. A framework is a collection of pre-written JavaScript code libraries 
    that provide developers with pre-written JS code to use for routine programming features and tasks

    1) Next.js has client-side routing, the pages folder automatically creates a URL for each js file
    
    2) Next.js has pre-rendering, Next.js will pre-render every page in the background, this results in faster routing
                -The way this works is that NEXT.js will generate HTML for each page in advance, instead of the client side JS creating the HTML.
                    then, the HTML will be 'hydrated' once the HTML loads onto the browser. This means that the JS code will run and make the page fully interactive
                -Next.js has two type of pre-rendering; Static Generation and server side rendering (the main difference is WHEN the html is generated)
                    STATIC GENERATION is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
                    SERVER-SIDE RENDERING is the pre-rendering method that generates the HTML on each page request. New HTML is generated for each page request
                 -npm run dev will use static generation, but its possible to use a 'hybrid' app that uses static generation for some pages and server-side rendering for others
                 -Next.js recommends that you use static generation whenever possible, but if the content of a page is constantly updating, then you should use server-side rendering
                 -look for the sections static generation and server-side rendering for more info below
                 
    3) Next.js does code-splitting automatically, so each page only loads what’s necessary for that page 
    
    4) Next.js has built in support for SASS
    
    5) Next.js has image optimization, this means...
                -the images are lazy loaded by default, 
                -devs can use advanced configuration that includes props such as sizes, quality, loader and priority, etc...
                -images are optimized on-demand as the users request them, instead of at build time, this improves build time
                -Next.js can support modern image formats like WebP in supported browsers
    
    
    
    
    

    Steps for initializing Next.js
    
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





















//======================================================== _APP.js =========================================================================================
// The _app.js file is a component that Next.js will use to pass EVERY page as props, 
// this is useful for having global css or wrapping the app with a <Provider> from redux or Context

import '../common/styles.css';

export default function MyApp({Component, pageProps}) {         //Component is the page that is passed down to this component
    return(                                                     //pageProps is the getStaticProps() or getServerSideProps() from the page
        <Component {...pageProps} />        
    )
}






























//======================================================== STATIC GENERATION WITH DATA =======================================================================
// STATIC GENERATION is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
// you can use getStaticProps() to make fetch requests for pages that are statically generated



export default function Home(props) {           //this component will rely on the data from an API to populate its content when it first loads on the screen
    const {userName, userEmail} = props;
    
    return (
        <main>
            {userName}
            {userEmail}
        </main>
    )
}

export async function getStaticProps(context) {        
  const response = await fetch('url');              //The value of the `props` key will be passed to the `Home` component   
  const data = await response.json();

  return {
        props : {data : data}
    }
}



/* 
    context is an object that has the following properties
    
        params: An object that contains route parameters for pages using dynamic routes. 
                For example, if the page name is pages/posts/[id].js, then params will look like { id: ... }.
        preview: A boolean value that indicates whether the page is in preview mode or not.
        previewData: An object that contains the preview data set by setPreviewData().
        locale: A string that contains the active locale (if i18n is enabled).
        locales: An array that contains all supported locales (if i18n is enabled).
        defaultLocale: A string that contains the configured default locale (if i18n is enabled).

*/






























//==================================================== SERVER-SIDE RENDERING WITH DATA ==============================================================================
// SERVER-SIDE RENDERING is the pre-rendering method that generates the HTML on each page request. New HTML is generated for each page request
// you can use getServerSideProps() to make fetch requests at page request
// You should use getServerSideProps() only if you need to pre-render a page whose data must be fetched at page request time.

export default function Home(props) {           //this component will rely on the data from an API to populate its content when it first loads on the screen
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
    props: {
        data
    },
  };
}


























//================================================ DYNAMIC ROUTING BASED ON DATA FROM A SERVER ==========================================================================
// You can create dynamic routes in Next.js, which are basically links that are generated dynamically based on external data from an API or server
// Files in the pages folder that start like this, [id].js are dynamic routes in Next.js
// Typically, the name of the dynamic route should be the same name as the property of the object that is returned from an API call


// 1) -----------------------        /pages/index.js ----------------------------------------------------------------
export default function Home({allPostsData}) {
     //each of the following links point to a dynamic route that is created in [id.js]
    return(   
        <>
            {allPostsData.map((post) => {
                    return(<Link href={'/pages/${post.id}'}> CLick here</Link>)       
               })}
        </>
    )
}

export async function getStaticProps() {
    const allPostsData = fetch('https://example.com/api/posts');
    
    return {
      props: {
        allPostsData
      }
    }
  }





// 2) --------------------------     /pages/[id].js ----------------------------------------------------------------
export default function Post({post}) {
    return (
        <Layout>
            {post.postName}
            {post.postID}
        </Layout>    
    )
}

//this will generate all the dynamic pages
export async function getStaticPaths() {
    const posts = await fetch('https://example.com/api/posts');              //making a fetch request
                                           
    const paths = posts.map((path) => {    
        return {                               // pathsArray MUST be an array of objects
                 params: {                     // each object MUST have a params property
                  id: path.author               // each object MUST have the name of the [dynamic route] as a property, the value will be the new name of the dynamic route
                }                           
        })
    }) 
    return {paths,                            // there MUST be a property called paths here                  
        fallback: false}                      // false means that any paths not returned by getStaticPaths will result in a 404 page       
                                              // other values are true and blocking, check out documentation for this      
}                                                  
                                                 

//this will fetch the actual data and pass it to the post component for formating
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



//--------------------------------------- /pages/[...id].js ----------------------------------------------------------------
// You can create nested routes by using the following syntax and boilerplate code

export async function getStaticPaths() {
                                        
    return { paths: [{params : {id: ['a', 'b', 'c']}}],       //id : ['a', 'b', 'c'] will match the page route       /pages/a/b/c    only         
        fallback: false}                         
                                                  
}  

export async function getStaticProps(context) {
     const id = context.params.id;                            // id = ['a', 'b', 'c']

    // ...
}





























//=================================================== DYNAMIC ROUTING NOT BASED ON DATA FROM A SERVER ==========================================================================
//You can create dynamic routes that are no based on data from a server, but you have to use getServerSideProps() instead of getStaticPaths()
//this dynamic route will catch ALL occurences of /pages/anythingGoesHere

                                                        //just typing any variation of the url below in the browser will take you to this component
// -----------------  /pages/[userprofile].js                     /pages/RoseCaldwell    /pages/JohnSmith     /pages/JerryHernandez

export default function UserProfile() {

}


export function getServerSideProps(context) {

}

















    
 //======================================================== USE ROUTER() HOOK ===================================================================================
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
















//====================================================== API ROUTES =============================================================
// API Routes let you create an API endpoint inside a Next.js app.
// The naming convention is: /pages/api     or      /pages/api/firstEndpoint                  folder with the name api will use its files as the endpoints
// For the example below, you can access the route http:localhost/3000/api


/* 
        Things to know about API Routes
        
    1)  Do not fetch an API route from getStaticProps or getStaticPaths
    2)  API Routes do not specify CORS headers, meaning they are same-origin only by default 
    3)  You can use API routes to securely communicate with a third party api
    4)  Previewing draft content from your CMS
    5)  Saving data to your database
 */


//  ---------------- /pages/api.js --------------------

export default function handler(req, res) {             // req = HTTP incoming message, res = HTTP server response
    if(req.method === 'POST')
        const email = req.body.email;
   
    const cookies = req.cookies;
    
  // Then save email to your database, etc...
}



// ------------------ /pages/index.js -------------------

export default function Home() {
    const input = useRef();

    const handleClick = () => {
        fetch('/api', {
            method: 'POST'
            body: {email: input.current.value};
        })             
    }

    return(
            <form>
                <input type='text' onClick={handleClick} ref={input}> 
           </form>
    )

}




























//==================================================== DYNAMIC API ROUTES ========================================================================================
// API Routes can be dynamic, and follow similar convention to dynamic routes
// You can access the request handler below by typing           http:localhost:3000/api/anythingGoesHere          

//      /pages/api/[endpoint].js

export default function handler(req, res) {
  const { pid } = req.query;
  res.end(`Post: ${pid}`);
}





//      /pages/index.js

export default function Home() {
    const input = useRef();

    const handleClick = () => {
        fetch('/api/anythingGoesHere', {                            //this will fetch the api endpoint in /pages/api/[endpoint].js
            method: 'POST'
            body: {email: input.current.value};
        })             
    }

    return(
            <form>
                <input type='text' onClick={handleClick} ref={input}> 
           </form>
    )
}



























// ======================================================== 404 CUSTOM PAGE ===============================================================================================
// you can create your own custom 404 page


//      pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}



















//============================================================ LINK COMPONENT ============================================================================================
// Link component is used to navigate between the pages in a Next.js app


import Link from 'next/link';

export default function FirstPost() {
  return (
        <Link href="/"> 'Back to home' </Link>
  );
}

/* 
          pages
             index.js              /
             posts
                first-post.js      /posts/first-post
                second-post.js     /posts/second-post
             about-me              /about-me
*/






















//========================================================= IMAGE COMPONENT ============================================================================================
// Image component is used to display images in Next.js. It will automatically be optimized for different viewports and accepts all image formats
// Keep in mind that the Image component has ALOT of props that you can use, check out the documentation for <Image>

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
                priority                                                //this will make the image load faster, images by default are lazy loaded
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




















//========================================================== MARKDOWN ==========================================================================================
// Markdown is a lightweight markup language for creating formatted text using a plain-text editor, its used for websites that use alot of text like blogs
// you can render markdown by using this package
// npm install remark remark-html
// npm install grey-matter


/*  myMarkdown.md

    ---
    title: 'When to Use Static Generation v.s. Server-side Rendering'
    date: '2020-01-02'
    ---

    We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

    You can use Static Generation for many types of pages, including:

    - Marketing pages
    - Blog posts
    - E-commerce product listings
    - Help and documentation

    You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

    On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

    In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.

*/

// You can use the following function to parse markdown and display it with HTML
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getMarkdownData() {
      const postsDirectory = path.join(process.cwd(), 'posts');         //process.cwd() will return a string that displays the current working directory and will look for the posts folder
      const fullPath = path.join(postsDirectory, 'myMarkdown.md');      //creates the full path to the markdown file
      const fileContents = fs.readFileSync(fullPath, 'utf8');           //reads the file and stores the content in fileContents

      const matterResult = matter(fileContents);                        // Use gray-matter to parse the post metadata section

      const processedContent = await remark()                           // Use remark to convert markdown into string
        .use(html)                                                      // convering markdown into HTML
        .process(matterResult.content);

      const contentHtml = processedContent.toString();

      // Combine the data with the id and contentHtml
      return {
        id: 'myMarkdown.md',
        contentHtml,
        ...matterResult.data,
      };
}




// Using the function getMarkdownData() in the component below

export default function Home({markdown}) {
     <div dangerouslySetInnerHTML={{__html: markdown.contentHtml}}/>
}

export async function getStaticProps() {
    const markdown = await getMarkdownData();    
    return {
      props: {
        markdown
      },
    };
  }




