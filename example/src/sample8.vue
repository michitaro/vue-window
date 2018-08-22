<template>
    <div>

        <hsc-window-style-metal>

            <hsc-window
                title="Window 1"
                :closeButton="true"
                :isOpen.sync="isOpen1">
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

            <button @click="isOpen1 = ! isOpen1">Toggle Window 1</button>

        </hsc-window-style-metal>


        <div class="side-bar">

            <hsc-window-style-metal>

                <hsc-window
                    title="Window 2"
                    :closeButton="true"
                    :isOpen.sync="isOpen2"
                    :append-to-body="false"
                    :top="150"
                    :left="100">
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

                <hsc-window
                    title="Window 3"
                    :closeButton="true"
                    :isOpen.sync="isOpen3"
                    :append-to-body="true"
                    :top="150"
                    :left="100">
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

            </hsc-window-style-metal>

            <button
                class="toggle-window-button"
                @click="isOpen2 = ! isOpen2">
                Toggle Window 2 (appendToBody = false)
            </button>

            <button
                class="toggle-window-button"
                @click="isOpen3 = ! isOpen3">
                Toggle Window 3 (appendToBody = true)
            </button>

        </div>

    </div>
</template>


<script lang="ts">
export default <any>{
    data() {
        return {
            isOpen1: true,
            isOpen2: false,
            isOpen3: false
        }
    },
}
</script>

<style lang="scss" scoped>
.side-bar {
  position: absolute;
  right: 0px;
  width: 300px;
  height: 85%;
  padding: 20px 20px;
  background-color: #d3d3d3;
}
.toggle-window-button {
  margin-top: 30px;
}
</style>
