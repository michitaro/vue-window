<template>
    <hsc-window-style-metal>

        <hsc-window
            title="Window 1"
            :collapseButton="true"
            :isCollapsed.sync="isCollapsed">
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

        <button @click="isCollapsed = ! isCollapsed">Toggle Window 1</button>

    </hsc-window-style-metal>
</template>

<script lang="ts">
export default <any>{
    data() {
        return {
            isCollapsed: false,
        }
    },
}
</script>
