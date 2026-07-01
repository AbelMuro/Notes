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

    To navigate to a different page in Next.js you can use the Link component or useRouter() hook
*/


//----------- Link Component
import Link from 'next/link';

function App() {
    return {
         <Link href='/'> </Link>
         <Link href='/home'>  </Link>
         <Link href='/aboutus'>  </Link>
         <Link href='/contactus'>  </Link>
    }
}




//------------ useRouter Hook()
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
    return(   
        <div>
            <Link href={'/pages/one'}/>                                                          <!-- [id].js -->
            <Link href={'/pages/1/2/3'}> Click Here </Link>                                      <!-- [...id].js -->
        </div>
    )
}



//      /pages/[...id].js
import { useRouter } from 'next/router';

function Post() {
  const router = useRouter();
  const { id } = router.query;              // id is the same name as the dynamic url

    // id = ['1','2','3']      if the URL is   /pages/1/2/3
    // id = ['a', 'b']         if the URL is   /pages/a/b

  return <></>;
}

