<template>
    <hsc-window-style-white>
        <hsc-window title="Resizable" :resizable="true" :isOpen="isOpen">
            hello world
        </hsc-window>
        <button @click="isOpen = !isOpen">toggle</button>
    </hsc-window-style-white>
</template>


<script lang="ts">
import Vue from 'vue'

export default {
    data() {
        return { isOpen: true }
    }
}
</script>
