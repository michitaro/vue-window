import * as hscWindow from "../../src"
import Vue from 'vue'
import Sample1 from "./sample1.vue"
import Sample2 from "./sample2.vue"
import Sample3 from "./sample3.vue"
import Sample4 from "./sample4.vue"
import Sample5 from "./sample5.vue"
import Sample6 from "./sample6.vue"


window.addEventListener('load', e => {
    const Sample: Vue.Component = ({
        Sample1,
        Sample2,
        Sample3,
        Sample4,
        Sample5,
        Sample6,
    } as any)[location.search.substr(1)] || Sample1
    Vue.use(hscWindow)
    new Vue({
        el: emptyElement(),
        render(h: Vue.CreateElement) {
            return h(Sample)
        }
    })
})


function emptyElement() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    return div
}