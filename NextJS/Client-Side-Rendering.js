//============================================= CLIENT SIDE RENDERING =============================================
/* 
    Next.js will use client side rendering by default, you can use React hooks and classes in client side rendering
                                                 
    Client side rendering is the process of rendering your application on your browser   
    
             1. First, we load the JavaScript to the client. When that has finished we can…                  
             2. Fetch the data from the server. When that has finished we can….
             3. We render the react components in the DOM… When that has finished we can…
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




