import {ref, onMounted, onBeforeUnmount} from 'vue';

function useMediaQuery(initialQuery){
    const matches = ref(false);
    let media;

    const handleChange = (media) => {
        matches.value = media.matches;
    }

    onMounted(() => {
        media = window.matchMedia(initialQuery);
        matches.value = media.matches;
        media.addEventListener('change', handleChange);
    });

    onBeforeUnmount(() => {
        media.removeEventListener('change', handleChange)
    })

    return [matches];
}


export default useMediaQuery;
