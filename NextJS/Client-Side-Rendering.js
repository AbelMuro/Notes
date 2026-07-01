//============================================= CLIENT SIDE RENDERING =============================================
/* 
    Next.js will use client side rendering by default, you can use React hooks and classes in client side rendering
                                                 
    Client side rendering is the process of rendering your application on your browser   

    -Client-side rendering should be used for web apps that require high-interactivity, SEO doesn't matter, 
    and the content always changes (Social media, chat apps, etc..)
    
             1. The browser sends a request to the server             
             2. The server sends a minimal HTML file with the javascript bundle
             3. The browser will hydrate the page with javascript
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




