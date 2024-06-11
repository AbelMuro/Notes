/* 
    Javascript has a class called Date that can be used to get the current date and also manipulate any date with methods

    Epoch: January 1, 1970

    Remember, if you want to display the time in the user's local timezone, use .getMonth();
    but if you want to display the time in the universal timezone, use .getUTCMonth()
*/

const date = new Date();                                              //this will return the current date in the format YYYY-MM-DDTHH:mm:ss.sssZ      ss = seconds     sss = milliseconds    z = timezone offset
const month = date.getMonth();                                        //this will return the current month as a 0-indexed value
const hour = date.getHours();                                         //this will return the current hour in 24-hour-format
hour = hour % 12;                                                        //converting to 12 hour format
hour = hour ? hour : 12
const year = date.getFullYear();                                      //this will return the current year
const day = date.getDay();                                            //this will return the current day of the week (0 represents sunday, 6 represents saturday)

const milliseconds = Date.now();                                      //this function will return the current milliseconds between today's date and the epoch
const SevenMinutesIntoFuture = new Date(milliseconds + (7 * 60000))   //you can get a future date by adding milliseconds like this  (1 minutes is 60000 milliseconds)
