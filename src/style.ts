import Vue, * as vue from 'vue'


export type Style = Partial<CSSStyleDeclaration>


export interface WindowStyle {
  window: Style,
  titlebar: Style,
  content: Style,
  button: Style,
  buttonHover: Style,
  buttonActive: Style,
}


export const WINDOW_STYLE_KEY = '@hscmap/vue-window/windowStyle'


export function StyleFactory(windowStyle: WindowStyle): vue.ComponentOptions<Vue> {
  return {
    provide() {
      return { [WINDOW_STYLE_KEY]: windowStyle }
    },
    render(this: Vue, h: vue.CreateElement) {
      return h('div', this.$slots.default)
    },
  }
}


export const StyleBlack: vue.ComponentOptions<Vue> = StyleFactory({
  window: {
    color: '#fff',
    boxShadow: '0 0 6pt rgba(255, 255, 255, 0.75)',
    backgroundColor: 'rgba(31, 31, 31, 0.9)'
  },
  titlebar: {
    backgroundColor: 'rgba(63, 63, 63, 0.9)'
  },
  content: {
  },
  button: {
    color: 'white'
  },
  buttonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)'
  },
  buttonActive: {
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
})


export const StyleWhite: vue.ComponentOptions<Vue> = StyleFactory({
  window: {
    color: '#000',
    boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.5)',
    backgroundColor: 'rgba(239, 239, 239, 0.95)'
  },
  titlebar: {
    backgroundColor: 'rgba(191, 191, 191, 0.9)'
  },
  content: {
  },
  button: {
    color: '#000'
  },
  buttonHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  buttonActive: {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})


export const StyleMetal: vue.ComponentOptions<Vue> = StyleFactory({
  window: {
    color: '#000',
    boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.5)',
    background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))'
  },
  titlebar: {
    background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))'
  },
  content: {
  },
  button: {
    color: '#000'
  },
  buttonHover: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  buttonActive: {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
})