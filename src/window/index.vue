<template>
    <z-index ref="zIndex" :group="zGroup">
        <transition name="fade">
            <div v-show="isOpen" class="window" :style="style.window" ref="window" @mousedown="$refs.zIndex.raise()">
                <div class="titlebar" :style="style.titlebar" ref="titlebar">
                    <div class="title">
                        <template v-if="$slots.title">
                            <slot name="title" />
                        </template>
                        <template v-else>{{title}}</template>
                    </div>
                    <template v-if="closeButton">
                        <my-button @click="$emit('closebuttonclick')">&times;</my-button>
                    </template>
                </div>
                <div class="content" :style="style.content">
                    <slot/>
                </div>
            </div>
        </transition>
    </z-index>
</template>

<script lang="ts">
import { WindowType } from "./script"
export default WindowType
</script>

<style lang="scss" scoped>
.window {
    display: flex;
    flex-flow: column;
    position: absolute;
    border-radius: 4pt 4pt 0 0;
}

.titlebar {
    display: flex;
    flex-flow: row nowrap;
    border-radius: 4pt 4pt 0 0;
    font-family: sans-serif;
    padding: .5em;
}

.title {
    flex-grow: 1;
}

.content {
    flex-grow: 1;
    padding: 0.5em;
}

.draggable-handle {
    cursor: move;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.fade-enter-active,
.fade-leave-active {
    transition: 0.2s
}
</style>
