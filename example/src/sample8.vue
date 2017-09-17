<template>
    <hsc-window-style-white>
        <hsc-window title="Window 1" :closeButton="true" :isOpen="w1" @closebuttonclick="w1 = !w1">
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

        <hsc-window title="Window 2" :closeButton="true" :isOpen="w2" @closebuttonclick="w2 = !w2">
            Parameters:
            <fieldset>
                <legend>&gamma;</legend>
                <input type="range" />
            </fieldset>
            <fieldset>
                <legend>&delta;</legend>
                <input type="range" />
            </fieldset>
        </hsc-window>
        <button @click="w1 = !w1">toggle window1</button>
        <button @click="w2 = !w2">toggle window2</button>
    </hsc-window-style-white>
</template>


<script lang="ts">
import Vue from 'vue'

export default {
    data() {
        return {
            w1: true,
            w2: true,
        }
    }
}
</script>