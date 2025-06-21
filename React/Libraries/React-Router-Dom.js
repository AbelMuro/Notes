//=========================================== REACT ROUTER ================================================
/* 
       React Routers implements Client side routing in a React application. This library will
       connect a component to a specific route.

       npm install react-router-dom
       
*/




//------------------------------------- Browser Router
/* 
        BrowserRouter component is a context provider that enables all the 
        React Router features in your application. You can also have custom
        components as a child in this provider.

*/

function App() {

        return (
                <BrowserRouter> 
                        <CustomComponent/>
                </BrowserRouter>
        )
}








//------------------------------------- Routes Component
/* 
        The Routes component is a container for all the routes in your
        application. This component cannot have any custom components as
        a child.
*/

function App() {

        return (
                <BrowserRouter> 
                        <Routes> 
                
                        </Routes>
                </BrowserRouter>
        )
}




//------------------------------------- Route Component
/* 
        The Route component defines the actual routes in your application. 

                Syntax: 
                        <Route path={} element={}>

                                path:  The path to the route
                                element: the commponent that will be rendered in the route
*/

function App(){
        return (
            <BrowserRouter> 
                        <Routes> 
                             <Route path={'/'} element={<HomePage />}>
                             <Route path="*" element={<PageNotFound />}/>                /// if the user goes to a route that doesnt exist, this route will be displayed (404 page)
                        </Routes>
           </BrowserRouter>
        )
}



//------------------------------------- Navigating Routes (useNavigate hook, Link component)
/* 
        You can use the <Link/> component or the useNavigate() hook to 
        navigate to different routes.
*/

function App(){
        const navigate = useNavigate();

        const handleClick = () => {
                navigate("/aboutUs", {state: {data: "whatever"}});     // will navigate to the '/aboutUs' component and pass {data: "whatever"} to another component
                navigate('..');                                        // will navigate to the parent route of the current route
                navigate(-1);                                          // will navigate to the previous route
                navigate('contactUs')                                  // will add contactUs to the current pathname      (/account   ->    /account/contactUs)
                navigate('aboutUs');                                   // keep in mind that calling navigate like this again will only change the last parameter of the pathname  (/account/contactUs    ->     /account/aboutUs)
        }

        return (
                <>                                                         //state prop will pass data from one route to another
                         <Link to="/ContactUs/email" className="example" state={{ message: "Hello from Home!" }}> Email us </Link>
                         <Link to="/ContactUs/phone" className="example" state={{ message: "Hello from Home!" }}> Call us </Link>
                </>   
        )
}





//------------------------------------- Child Route Components
/* 
        Every Route component can have other nested Route components.
        The parent Route must have an <Outlet/> component that can
        be used to render the nested Route components. Use <base href="/" /> 
        in the index.html when you are using nested routes, this will 
        prevent your app from sending a request to a route in the server.
*/

function App() {
        return(
                <BrowserRouter> 
                        <Routes> 
                                <Route path="/ContactUs" element={<ContactUs/>}>      
                                     <Route path="/ContactUs" element={<ContactUs/>}/>                          /// if the child route has the same path as the parent, it will still be displayed
                                     <Route path="/ContactUs/email" element={<EmailUs/>}/>                      /// this child route will be displayed ONLY if the pathname is /ContactUs/email
                                     <Route path="/ContactUs/phone" element={<CallUs/>}/>                       /// this child route will be displayed ONLY if the pathname is /ContactUs/phone
                                </Route>
                        </Routes>
                </BrowserRouter>
        )
}

function ContactUs() {                                     //as long as the current pathname starts with /ContactUs, this component will be rendered
        return(
                <div> 
                        <h1> Contact Us<h1>
                        <Outlet />                         //this will render either /ContactUs/email   or   /ContactUs/phone
                </div>    
        )
}





//------------------------------------- Routes with dynamic pathnames (useParams hook)
/* 
      You can create a dynamic path for a route with the following syntax

      /:path                path can be any placeholder

      You can access the dynamic path by using useParams()
*/

function App(){
        return(
                <BrowserRouter> 
                        <Routes>
                                <Route path="/:path" element={<ContactUs/>}>
                                <Route path="/DonateUs" element={<Donate/>}/>                
                                <Route path="/DonateUs/:path" element={<ThankYou />}/>            
                                <Route path="/DonateUs/:path/:otherPath" element={<DonateMore/>}  
                        </Route>
                </BrowserRouter>
        )
}

function ThankYou() {                                      
    const {path} = useParams();                             // path is the dynamic path placeholder that you used in the pathname of the route                                                        
}

function DonateMore(){
    const {path, otherPath} = useParams();                 // if the route has multiple dynamic paths, you can access all of them through this hook
}




//------------------------------------- Passing Data between Routes (useLocation hook)
/* 
        You can pass data from one route to another with the useLocation()
        hook.
*/

function Home() {
        const navigate = useNavigate();
        
        navigate('/aboutus', {
                state: {
                        {data: 'whatever'}
                }
        });
}

function AboutUs() {
        const location = useLocation();

        location.pathname;                        // A string representing the current URL path.
        location.search;                          // A string representing the query parameters of the URL (everything after ?).
        location.hash;                            // A string representing the fragment identifier (everything after #).
        location.state;                           // The state object passed via link or navigate, typically for persisting data between navigations.
        location.key;                             // A unique identifier for the current location entry in the history stack.
}








//------------------------------------- Create Browser Router
/* 
        You can use the createBrowserRouter() function to 
        organize route components in a different way.

        CreateBrowserRouter() accepts an array of objects.
        Each object has the following properties.

        {
             path: '/home'                  the pathname for the route
             element: <Home/>               the component that will be rendered when the route matches the path '/home'
        }
*/

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
       
        const router = createBrowserRouter([
                {
                    path: "/",
                    element: <Home />,
                },
        ]};

        return (
            <RouterProvider router={router}/>
        )
}



//------------------------------------- Create Browser Router and Child route components
/* 
        You can use the children property in the createBrowserRouter() to display
        child route components within a parent route component. This is done with
        the help of <Outlets/>. The children property accepts an array of objects that 
        have the following properties

        const router = createBrowserRouter([
                {
                     path: '/'                 
                     element: <Layout/>              this component must have an <Outlet/> to display its child route components
                     children: [
                             {
                                   index: true,         this child component will be displayed first when the pathname is '/'
                                   element: <Home/>
                                   children: [{}]        the child route component can also have its own child route components, but it must use the <Outlet/> component as well
                             },
                             {
                                   path: '/about-us',
                                   element: <AboutUs/>
                                   children: [{}]
                             }
                     ]
                }
        ]}
*/

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

function App() {

        const Layout = () => {
              return(
                      <>
                          <NavigationBar/>
                          <Outlet/>
                      </>
              )  
        }

        const router = createBrowserRouter([
                {
                        path: '/',
                        element: <Layout/>,                
                        children: [
                            {
                                index: true,
                                element: </Home>
                            },
                            {
                                path: 'login',
                                element: <Login/>
                            }
                        ]
                }
        ])


        return (
                <RouterProvider router={router}>
        )
        
}





//------------------------------------- Blocking navigation until user gives consent (useBlocker hook)
/* 
        You can use the useBlocker() hook to prevent a user
        from navigating away from the current page until 
        they give consent. This hook will automatically detect
        any changes made to the navigation. If you create a custom hook
        that uses useBlocker(), the custom hook must return the block
        object from useBlocker() to the component using the custom hook.
        

        KEEP IN MIND, to use the useBlocker() hook, 
        You need to use createBrowserRouter() and
        <RouterProvider/>
*/

function App() {
        const block = useBlocker(true);                        // the hook can accept a boolean, indicating if all navigation should be blocked
        const block = useBlocker(() => shouldBlock)            // the hook can accept a callback that returns a state, indicating conditional navigation blocking
}




        

//------------------------------------- block.proceed()
/* 
        If navigation has been blocked, you can let the user navigate away with the proceed() method
*/

function App() {
        block.proceed();
}


//------------------------------------- block.reset()
/* 
        If navigation has been blocked, you can prevent the user from navigating away with the reset() method
*/

function App() {
        block.reset();
}

        

//------------------------------------- block.status
/* 
        The status property has two possible values, idle and blocked. Initially, the status will always
        be idle, but if navigation is blocked, then the status will change into 'blocked' if the user
        tries to navigate away from the current page. A change in this property will cause a re-render,
        and should be used to handle blocked navigation.
*/

function App() {
        const block = useBlocker(true);

        useEffect(() => {
                if(block.status !== 'blocked') return;
        
                const confirmed = confirm('Are you sure you want to leave? You will forfeit the match in doing so');
                if(confirmed)
                    block.proceed();                        
                else        
                    block.reset();      
        }, [block.status])
}
