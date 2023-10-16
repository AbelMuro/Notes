//this hook works best with items in the local storage that are arrays

//KEEP IN MIND that for the event listener to detect changes in the local storage, you must MANUALLY dispatch the event 'storage'

/* 
    const dispatchEvent = (item) => {
        localStorage.setItem(item);                                        // first, we make changes to the local storage
        const event = new Event('storage');                                // create the event object
        document.dispatchEvent(event);                                     // then we dispatch the event object, this will trigger any event listeners
    }

*/

function useLocalStorage({key}) {
    const [files, setFiles] = useState([]);

    useEffect(() => {                                                        //this will populate the state with the data from localstorage
        const allFiles = JSON.parse(localStorage.getItem(key)) || [];
        setFiles(allFiles);
    }, [])

    useEffect(() => {                                                        //this will detect changes from the local storage and will update the state
        document.addEventListener('storage', () => {
            const allFiles = JSON.parse(localStorage.getItem(key)) || [];
            setFiles(allFiles);
        })
    }, [])

    return files;
}
