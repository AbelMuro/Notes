//you can use this component to create an interval in react

function useInterval(callback, delay) {

    useEffect(() => {
        function tick() {
            callback();
        }

        if(delay !== null) {
            let id = setInterval(tick, delay);                //creating interval
            return () => {
                clearInterval(id);                            //clearing interval after every render
            }
        }
        
    }, [delay, clear]);
}




useInterval(() => {
  //do something
}, 6000)
