import * as VueWindow from "../../src"
import Vue, * as vue from 'vue'
import Sample1 from "./sample1.vue"
import Sample2 from "./sample2.vue"
import Sample3 from "./sample3.vue"
import Sample4 from "./sample4.vue"
import Sample5 from "./sample5.vue"
import Sample6 from "./sample6.vue"
import Sample7 from "./sample7.vue"
import Sample8 from "./sample8.vue"


Vue.use(VueWindow)


window.addEventListener('load', e => {
  const Sample: vue.Component = ({
    Sample1,
    Sample2,
    Sample3,
    Sample4,
    Sample5,
    Sample6,
    Sample7,
    Sample8,
  } as any)[location.search.substr(1)] || Sample1
  new Vue({
    el: emptyElement(),
    render(h: vue.CreateElement) {
      return h(Sample)
    }
  })
})


function emptyElement() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  return div
}