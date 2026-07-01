//==================================================== SERVER-SIDE RENDERING ==============================================================================
/*  
                       Server side rendering is the process of rendering your application on the server and sending 
                       it to the client as fully rendered HTML pages 
                       
                            1) The browser sends an HTTP request to the server.
                            
                            2) The server processes the request, fetches necessary data, and renders the HTML.
                            
                            3) The fully formed HTML is sent to the client, which displays it instantly.
                            
                            4) Optional JavaScript is then loaded by the browser to add interactivity (hydration) .
  

    For a page to use server side rendering, the file needs to export getServerSideProps() from the file
    
    1) When a page uses server side rendering, Next.js will call getServerSideProps() to fetch data or some other async operation.
    2) Then we pass the data as props to the page. 

    This process happens everytime the client makes a request to the server to view the page. In other words, everytime you refresh the page, 
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


