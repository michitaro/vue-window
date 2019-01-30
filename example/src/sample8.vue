<template>
  <hsc-window-style-metal>
    <hsc-window
      title="Drag Handle"
      :width="400"
      :height="300"
      :left.sync="left"
      :top.sync="top"
    >
      <div
        ref="handle"
        class="box"
        @mousedown.stop.prevent="mousedown"
      ></div>
    </hsc-window>
  </hsc-window-style-metal>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      left: undefined as undefined | number,
      top: undefined as undefined | number,
    }
  },
  methods: {
    mousedown(e: MouseEvent) {
      const baseLeft: number = this.left!
      const baseTop: number = this.top!
      const mousemove = (e2: MouseEvent) => {
        this.left! = baseLeft + e2.screenX - e.screenX
        this.top! = baseTop + e2.screenY - e.screenY
      }
      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 40px;
  background-color: aqua;
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  cursor: grab;
}
</style>
