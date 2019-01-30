<template>
  <hsc-window-style-metal>

    <hsc-window title="with {min,max}{Width,Height}" :resizable="true" :minWidth="200" :minHeight="200" :maxWidth="400" :maxHeight="400">
      <div class="radial-gradient-1"></div>
    </hsc-window>

    <hsc-window title="without max{Width,Height}" :resizable="true" :minWidth="200" :minHeight="200">
      <div class="radial-gradient-2"></div>
    </hsc-window>

    <hsc-window title="width,height" :resizable="true" :width.sync="width" :height.sync="height" overflow="hidden">
      <div style="padding: 1em;">
        <button>Cancel</button>
        <button>OK</button>
        <p>
          width={{width}}, height={{height}}
        </p>
      </div>
    </hsc-window>

    <hsc-window title="width,height (sync)" :resizable="true" :width.sync="width" :height.sync="height">
      <p style="padding: 1em;">
        width={{width}}, height={{height}}
      </p>
    </hsc-window>

    <hsc-window title="iframe" :resizable="true" @resize-start="blockPointerEvents = true" @resize-end="blockPointerEvents = false" @move-start="blockPointerEvents = true" @move-end="blockPointerEvents = false">
      <iframe :class="{ blockPointerEvents }" :src="`data:text/html;base64,${iframeSrc}`" style="width: 100%; height: 100%; box-sizing: border-box; border-style: none;" />
    </hsc-window>

    <hsc-window title="Scrollable" :resizable="true" :isScrollable="true" :minWidth="100" :minHeight="100" :maxWidth="200" :maxHeight="200">
      <table>
        <tr>
          <th>&times;</th>
          <th v-for="j in range(n)" :key="j" v-html="j"></th>
        </tr>
        <tr v-for="i in range(n)" :key="i">
          <th v-html="i" />
          <td v-for="j in range(n)" :key="j" v-html="hex(i/n * j/n)" :style="{ backgroundColor: `rgb(${Math.floor(255 * i / n)}, ${Math.floor(255 * j / n)}, 127)` }" />
        </tr>
      </table>
    </hsc-window>

    Gradation samples from
    <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient">https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient</a>
  </hsc-window-style-metal>
</template>


<style lang="scss" scoped>
.radial-gradient-1 {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    ellipse farthest-corner at 45px 45px,
    #00ffff 0%,
    rgba(0, 0, 255, 0) 50%,
    #0000ff 95%
  );
}

.radial-gradient-2 {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    farthest-corner at 45px 45px,
    #ff0000 0%,
    #0000ff 100%
  );
}

table {
  border-collapse: collapse;
}

td {
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
}

th {
  color: white;
  background-color: #000;
}

.blockPointerEvents {
  pointer-events: none;
}
</style>


<script lang="ts">
import * as _ from 'lodash'
import { Base64 } from 'js-base64'

export default <any>{
  data() {
    return {
      n: 21,
      width: 200,
      height: 100,
      blockPointerEvents: false,
    }
  },
  methods: {
    range: _.range,
    hex(x: number) {
      let hex = Math.floor(255 * x).toString(16)
      if (hex.length <= 1)
        hex = `0${hex}`
      return hex
    },
  },
  computed: {
    iframeSrc() {
      return Base64.encode(`
        <h1>iframe</h1>
      `)
    }
  }
}
</script>