<template>
    <div>

        <hsc-window-style-metal>

            <hsc-window
                title="Window 1"
                :closeButton="true"
                :isOpen.sync="isOpen"
                :resizable="true"
                overflow="hidden">
                Parameters:
                <fieldset>
                    <legend>&alpha;</legend>
                    <input type="range" />
                </fieldset>
                <fieldset>
                    <legend>&beta;</legend>
                    <input type="range" />
                </fieldset>

                <div slot="footer">
                  <button @click="isOpen = false">Close</button>
                  <button @click="openAnotherWindow()">Open another window</button>
                </div>
            </hsc-window>

            <button @click="isOpen = ! isOpen">Toggle Window 1</button>

            <hsc-window
                v-for="(w, i) in windows"
                :key="i"
                :title="`Window ${i + (isOpen ? 2 : 1)}`"
                :closeButton="true"
                :isOpen.sync="windows[i].isOpen"
                :resizable="true"
                overflow="hidden">
                Parameters:
                <fieldset>
                    <legend>&alpha;</legend>
                    <input type="range" />
                </fieldset>
                <fieldset>
                    <legend>&beta;</legend>
                    <input type="range" />
                </fieldset>

                <div slot="footer">
                  <button @click="removeWindow(i)">Close</button>
                  <button @click="openAnotherWindow()">Open another window</button>
                </div>
            </hsc-window>

        </hsc-window-style-metal>

    </div>
</template>


<script lang="ts">
export default <any>{
    data() {
        return {
            isOpen: true,
            windows: []
        }
    },

    methods: {
        openAnotherWindow() {
            const self = <any>this
            self.windows.push({ isOpen: true })
        },

        removeWindow(i = Number) {
            const self = <any>this
            self.windows.splice(i, 1)
        }
    }
}
</script>
