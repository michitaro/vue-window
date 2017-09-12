import MyWindow from "./window/index.vue"
import { StyleBlack, StyleWhite, StyleFactory } from './style'
import Vue from 'vue'

export { WindowType } from "./window/script"
export { StyleBlack, StyleWhite, StyleFactory }

export function install(vue: typeof Vue, options = { prefix: 'hsc-window' }) {
    const { prefix } = options
    vue.component(`${prefix}`, MyWindow)
    vue.component(`${prefix}-style-black`, StyleBlack)
    vue.component(`${prefix}-style-white`, StyleWhite)
}