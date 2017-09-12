<template>
    <button @click="$emit('click')" :style="style" @mouseenter="hover = true" @mouseleave="hover = false" @mousedown.stop="mousedown" :disabled="disabled">
        <slot/>
    </button>
</template>

<script lang="ts">
import { WindowStyle } from "./style"
import { Component, Vue, Prop, Inject } from "vue-property-decorator"

@Component
export default class extends Vue {
    @Inject()
    windowStyle: WindowStyle

    @Prop({ type: Boolean, default: false })
    disabled: boolean

    hover = false
    active = false

    get style() {
        let s = this.windowStyle.button
        this.hover && (s = { ...s, ...this.windowStyle.buttonHover })
        this.active && (s = { ...s, ...this.windowStyle.buttonActive })
        return s
    }

    mousedown(e: MouseEvent) {
        e.preventDefault()
        this.active = true
        document.addEventListener('mouseup', e => this.active = false)
    }
}
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
