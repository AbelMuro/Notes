
//============================================= STATIC SITE GENERATION =============================================
/* 
         STATIC GENERATION is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then re-used on each request.
         For a page to use static site generation, the file needs to export getStaticProps() from the file.

                  1) The developer will compile the web app in a server 
                     and the HTML will be generated during compile time

                  2) The browser will then send a request to the server for the page

                  3) The server will send the fully generated html and the javascript bundle to the browser

                  4) The browser will then load (hydrate) the html with the javascript
                     

         -Static-site generation should be used for web apps where the content doesn't change often, SEO matters, and the speed is everything
              
         When a page uses static site generation, Next.js will call getStaticProps() to retrieve some kind of data.   
         Once it has the data, it will be passed to the page as props.   
         This process only happens once, and it happens during build time.

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











//--------------------------------------------- STATIC SITE GENERATION AND DYNAMIC ROUTING ---------------------------------------------
/*
    If you want your dynamic route to use static-site generation, you need
    to implement the function getStaticPaths(). This function will decide which
    dynamic routes will have static-site generation
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
