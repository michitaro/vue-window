<template>
    <my-theme>
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
    </my-theme>
</template>


<script lang="ts">
import { StyleFactory } from '../../src'
import Vue from 'vue'

const baseColor = {
    backgroundColor: '#365c68',
    color: 'white',
    boxShadow: '0 4pt 4pt rgba(0, 0, 0, 0.25)'
}

const active = {
}

const disabled = {
    opacity: '0.5'
}

const separator = {
    backgroundColor: '#f00'
}

export default <any>{
    components: {
        'my-theme': StyleFactory({
            button: {
                color: 'red'
            },
            buttonActive: {
                color: 'white'
            },
            buttonHover: {
                backgroundColor: 'rgba(255, 0, 0, 0.25)'
            },
            content: {
                backgroundColor: 'rgba(37, 61, 91, 0.5)'
            },
            titlebar: {
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25), #436f7c)'
            },
            window: {
                color: 'white',
                boxShadow: '0 2pt 8pt rgba(0, 0, 0, 0.5)'
            },
        })
    },
    data() {
        return {
            w1: true,
            w2: true,
        }
    }
}
</script>
