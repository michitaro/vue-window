<template>
  <hsc-window-style-metal>

    <hsc-window title="Window 1" :closeButton="true" :isOpen.sync="isOpen">
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

    <button @click="isOpen = ! isOpen">Toggle Window 1</button>

  </hsc-window-style-metal>
</template>


<script lang="ts">
export default <any>{
  data() {
    return {
      isOpen: true,
    }
  },
}
</script>