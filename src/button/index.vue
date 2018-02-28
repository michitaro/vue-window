<template>
    <button @click="$emit('click')" :style="style" @mouseenter="hover = true" @mouseleave="hover = false" @mousedown.stop="mousedown" :disabled="disabled">
        <slot/>
    </button>
</template>

<script lang="ts">
import { Button } from "./script"
export default Button
</script>


<style lang="scss" scoped>
button {
    background-color: transparent;
    border: none;
    font-size: medium;
    margin: 0;
    padding: 0 0.25em;
    border-radius: 4pt;
}
</style>
