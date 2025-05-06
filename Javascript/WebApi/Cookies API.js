//============================================================ COOKIES ==========================================================
/* 
    Cookies are a storage that lives on the browser, but is sent with every fetch request and response
    Cookies doesn't have any pre-build set and get methods, but there is an npm package that implements these methods

    It is strongly recommended that you use js-cookies for the set and get methods for cookies, 
*/




// -------------------- Creating Cookies
/* 
    You can create cookies by using the cookie property of the document object
    and assigning a string that contains name and value pairs.
    Keep in mind that assigning a different string to document.cookie 
    will NOT replace the old string. The browser will automatically save the cookie
*/
document.cookie = "username=john doe";                                              //adding a cookie
document.cookie = "password=whatever";                                              //adding another cookie




//-------------------- Accessing Cookies
/* 
    You can access all cookies by simply using the document.cookie 
*/

const allCookies = document.cookie;                 // will return a string with ALL the cookies
console.log(allCookies);                            // will display "username=abel; theme=dark"

const getCookie = (name) => {                       // use this function to get a specific cookie
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}




//-------------------- Deleting cookies
/* 
    To delete a cookie, just put the expiration date before today, 
    also you should include the path="/" because some browsers might need it
*/
document.cookie = "username=abel; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";  //deleting one cookie

document.cookie.split(";").forEach((cookie) => {                                    //deleting ALL cookies
    document.cookie = cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
});




//-------------------- Updating Cookies
/* 
    To update a cookie, just add another string to document.cookie with the
    same key as the cookie that you want to update
*/
document.cookie = "username=updated value";                                                //this will replace the username cookie with an updated




//-------------------- Expiration Dates for Cookies
/* 
    The expiration data must be in the following format..
    Thu, 01 Jan 2020 00:00:12 GTM
    The time should always be a 24 hour format

*/
document.cookie = "username=john doe; expires=Thu, 08 Dec 2025 12:00:00 UTC";            //you can set the expiration date for cookies




//-------------------- Accessibility of Cookies 
/* 
    You can use 'path' to allow the cookie to be accessible in a 
    certain page of the website
*/
document.cookie = "username=john doe; path='/'"                                     //path='/' makes the cookie accessible across the entire site
document.cookie = "username=john doe; path='/account'"                              //path='/account' makes the cookie accessible in the /account route























//============================================================ JS-COOKIES ==========================================================
/* 
    npm install js-cookies

    This API has built in methods that make using cookies must more simpler

*/




import Cookies from 'js-cookie';




//-------------------- Creating Cookies
/* 
    You can use the .set() method to set a cookie with a key and value
*/

Cookies.set('name', 'value');




//-------------------- Accessing Cookies
/* 
    You can use the .get() method to access a cookie with its key
*/

Cookies.get('name');                    //gets one cookie
Cookies.get();                          //gets all cookies




//-------------------- Deleting Cookies
/* 
    You can use the .remove() method to delete a cookie with its key
*/

Cookies.remove('name');




//-------------------- Updating Cookies
/* 
    You can use the .set() method to update a cookie
*/

Cookies.set('name', 'new value', {expires: 2});                 //this will just replace the cookie




//-------------------- Expiration Date for cookies
/* 
    You can use the third argument of the .set() method to set an
    expiration date
*/

Cookies.set('name', 'value', { expires: 7 })                    //expires 7 days from now




//-------------------- Accessibility of Cookies
/* 
    You can use the third argument of the .set() method to allow a cookie
    to only be accessible in certain routes
*/

Cookies.set('name', 'value');                                   //cookie will be valid across ALL pages
Cookies.set('name', 'value', { expires: 7, path: '' })          //cookie will be valid to the current page only
Cookies.set('name', 'value', { expires: 7, path: '/aboutme' })  //cookie will be value in the /aboutme page












