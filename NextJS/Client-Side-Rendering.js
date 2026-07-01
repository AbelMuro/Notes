//============================================= CLIENT SIDE RENDERING =============================================
/* 
    Next.js will use client side rendering by default, you can use React hooks and classes in client side rendering
                                                 
    Client side rendering is the process of rendering your application on your browser   

    -Client-side rendering should be used for web apps that require high-interactivity, SEO doesn't matter, 
    and the content always changes (Social media, chat apps, etc..)
    
             1. First, we load the JavaScript to the client.                
             2. Fetch the data from the server. 
             3. We render the react components in the DOM
             4. We can use the application. — see the content on the page, click on things etc.
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




