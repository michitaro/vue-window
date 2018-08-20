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
                    :append-to-body="appendToBody">
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

            <button @click="isOpen2 = ! isOpen2">Toggle Window 2 from sidebar</button>

            <div style="margin-top: 30px;">
                <label for="appendToBody">Append to body</label>
                <input
                    v-model="appendToBody"
                    type="checkbox"
                    name="Append to body"
                    id="appendToBody"
                />
            </div>

        </div>

    </div>
</template>


<script lang="ts">
export default <any>{
    data() {
        return {
            isOpen1: true,
            isOpen2: false,
            appendToBody: false
        }
    },
}
</script>

<style lang="scss" scoped>
.side-bar {
  position: absolute;
  right: 0px;
  width: 150px;
  height: 85%;
  padding: 20px 20px;
  background-color: #d3d3d3;
}
</style>
