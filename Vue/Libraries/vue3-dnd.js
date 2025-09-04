// npm install vue3-dnd -D
// npm install react-dnd-html5-backend -D


//The example below will re-arrange a list of items
//KEEP IN MIND, you should NOT use the transform property on items that are being dragged
//doing so will create visual bugs on mobile and tablet devices
//ALSO, use transform: translate(0,0) on the items being dragged to remove the background (sometimes items being dragged will drag the background of its parent element)


//-------------------- DndProvider
/*
    To use vue3-dnd, you must wrap the entire app inside the DndProvider wrapper
*/

<script setup>
    import {DndProvider} from 'vue3-dnd';
    import {HTML5Backend} from 'react-dnd-html5-backend';
</script>


<template>
    <DndProvider :backend="HTML5Backend">
            // the rest of the app goes here
    </DndProvider>
</template>





//-------------------- useDrag()
/* 
    The useDrag() hook can be used to enable dragging for an element

*/
<script setup>
    import {computed, watch} from 'vue';
    import {useDrag} from 'vue3-dnd';

    const [collect, drag] = useDrag(() => ({
        type: 'piece',
        item: () => ({name: pieceId}),               //name identifies the item being dragged
        canDrag: () => {
            return true or false; 
        },
        collect: monitor => ({                        //this callback will return an object that will used as the return value of useDrag()
            isDragging: monitor.isDragging(),
        }),
    }));
</script>


<template>
    <div :ref="drag">
    </div>
</template>











//-------------------- useDrop()
/* 
    The useDrop() hook is used to make an element into a container.
    The container is used to receive items being dragged 
*/

<script setup>
    import {computed} from 'vue';
    import {useDrop} from 'vue3-dnd';

    const [collect, drop] = useDrop(() => ({
        accept: 'piece',
        drop: (item, monitor) => {
            //this callback is called after an item is dropped on this container
        },
    }))

</script>

<template>
    <div :ref="drop">
    </div>
</template>




