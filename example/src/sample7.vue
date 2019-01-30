<template>
  <div>
    <component v-for="(style, name) in styles" :is="style" :key="name">
      <hsc-window :title="name" :closeButton="true" :isOpen.sync="isOpen[name]">
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
    </component>
    <button @click="toggle">toggle</button>
  </div>
</template>


<script lang="ts">
import { StyleFactory, StyleBlack, StyleWhite, StyleMetal } from '../../src'
import * as _ from 'lodash'


const StyleBluegreen = StyleFactory({
  button: {
    color: 'red'
  },
  buttonActive: {
    color: 'white'
  },
  buttonHover: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)'
  },
  content: {
    backgroundColor: 'rgba(37, 61, 91, 0.8)'
  },
  titlebar: {
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25), #436f7c)'
  },

  window: {
    border: '1px solid #f00',
    color: 'white',
    boxShadow: '0 2pt 8pt rgba(0, 0, 0, 0.5)'
  },
})


const styles = { StyleBlack, StyleWhite, StyleMetal, StyleBluegreen }


export default <any>{
  data() {
    return {
      styles,
      isOpen: _.mapValues(styles, v => true)
    }
  },
  methods: {
    toggle() {
      const self = <any>this
      for (const k of Object.keys(self.isOpen))
        self.isOpen[k] = !self.isOpen[k]
    }
  }
}
</script>