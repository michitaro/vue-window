<template>
  <div>
    <hsc-menu-style-metal style="position: fixed; z-index: 2;">
      <hsc-menu-bar style="border-radius: 0 0 4pt 0">
        <hsc-menu-bar-item label="Number">
          <hsc-menu-item label="New Random Number" keybind="alt+n" @click="newRandomNumber" />
          <hsc-menu-item label="Clear" keybind="alt+k" @click="numberWindows=[]" />
        </hsc-menu-bar-item>
        <hsc-menu-bar-item label="Windows">
          <hsc-menu-item v-for="w of numberWindows" :key="w.id" :label="w.label" @click="w.isOpen=!w.isOpen" :checked="w.isOpen" />
        </hsc-menu-bar-item>
      </hsc-menu-bar>
    </hsc-menu-style-metal>

    <hsc-window-style-metal style="position: fixed; z-index: 1">
      <hsc-window v-for="w of numberWindows" :key="w.id" :title="w.label" :closeButton="true" :isOpen.sync="w.isOpen">
        <table>
          <tr>
            <th>N</th>
            <th>N
              <sup>2</sup>
            </th>
            <th>N
              <sup>3</sup>
            </th>
          </tr>
          <tr>
            <td v-html="w.n"></td>
            <td v-html="Math.pow(w.n, 2)"></td>
            <td v-html="Math.pow(w.n, 3)"></td>
          </tr>
        </table>
      </hsc-window>
    </hsc-window-style-metal>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as VueMenu from '@hscmap/vue-menu'
import * as _ from 'lodash'


Vue.use(VueMenu)


export class NumberWindow {
  private static id = 0

  id = NumberWindow.id++
  isOpen = true

  constructor(readonly n = Math.floor(100 * Math.random())) { }

  get label() {
    return `Number - ${this.n}`
  }
}


@Component
export default class Sample6 extends Vue {
  numberWindows: NumberWindow[] = _.range(3).map(i => new NumberWindow())

  newRandomNumber() {
    this.numberWindows.push(new NumberWindow())
  }
}
</script>


<style lang="scss" scoped>
table {
  white-space: nowrap;
  border-spacing: 0.5em;
}

td,
th {
  text-align: center;
  padding: 1em;
  box-shadow: 0 0 4pt rgba(0, 0, 0, 0.25);
  background-color: #eee;
  border-radius: 4pt;
}
</style>
