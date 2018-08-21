<template>
    <transition name="fade" @after-leave="$emit('close')" @after-enter="$emit('open')">
        <div v-show="isOpen" class="window" :style="styleWindow" ref="window" @mousedown="activate">

            <div class="titlebar" :style="styleTitlebar" ref="titlebar">
                <div class="title">
                    <template v-if="$slots.title">
                        <slot name="title" />
                    </template>
                    <template v-else>{{title}}</template>
                </div>
                <template v-if="collapseButton">

                    <my-button
                        @click="collapseButtonClick">

                        <slot v-if="isCollapsed" name="expandButtonIcon" />

                        <div
                            v-if="!$slots.expandButtonIcon && isCollapsed"
                            style="transform: rotate(180deg); font-size: 11px;">
                            &#9658;
                        </div>

                        <slot v-if="!isCollapsed" name="collapseButtonIcon" />

                        <div
                            v-if="!$slots.collapseButtonIcon && !isCollapsed"
                            style="transform: rotate(90deg); font-size: 11px;">
                            &#9658;
                        </div>

                    </my-button>

                </template>

                <template v-if="closeButton">

                    <my-button
                        @click="closeButtonClick">

                        <slot name="closeButtonIcon" />

                        <span v-if="!$slots.closeButtonIcon">&times;</span>
                    </my-button>

                </template>
            </div>

            <div v-if="!isCollapsed" class="content" :style="styleContent" ref="content">
                <slot />
            </div>

            <div v-if="$slots.footer && !isCollapsed" class="footer" :style="styleFooter" ref="footer">
                <slot name="footer" />
            </div>

        </div>
    </transition>
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
    flex: 0 0 auto;
}

.title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 7px;
}

.content {
    flex-grow: 1;
    padding: 0.5em;
}

.draggable-handle {
    cursor: move;
}

.footer {
    display: flex;
    flex-flow: row nowrap;
    border-radius: 4pt 4pt 0 0;
    font-family: sans-serif;
    padding: .5em;
    flex: 0 0 auto;
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
