<template>
    <hsc-window-style-white>
    
        <hsc-window title="Window 1" :closeButton="true" :isOpen="isOpen" @closebuttonclick="isOpen=false">
            Parameters:
            <fieldset>
                <legend>&alpha;</legend>
                <input type="range" />
            </fieldset>
            <fieldset>
                <legend>&beta;</legend>
                <input type="range" />
            </fieldset>
        </hsc-window>

        <button @click="isOpen = ! isOpen">Toggle Window 1</button>
    
    </hsc-window-style-white>
</template>


<script lang="ts">
import Vue from 'vue'

export default {
    data() {
        return {
            isOpen: true,
        }
    },
}
</script>