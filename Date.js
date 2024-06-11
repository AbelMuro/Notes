/* 
    Javascript has a class called Date that can be used to get the current date and also manipulate any date with methods

    Epoch: January 1, 1970
*/

const date = new Date();                                              //this will return the current date in the format YYYY-MM-DDTHH:mm:ss.sssZ      ss = seconds     sss = milliseconds    z = timezone offset

const milliseconds = Date.now();                                     //this function will return the current milliseconds between today's date and the epoch
const SevenMinutesIntoFuture = new Date(milliseconds + (7 * 60000))  //you can get a future date by adding milliseconds like this  (1 minutes is 60000 milliseconds)
