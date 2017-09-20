<template>
    <hsc-window-style-metal>

        <hsc-window title="with {min,max}{Width,Height}" :resizable="true" :minWidth="200" :minHeight="200" :maxWidth="400" :maxHeight="400">
            <div class="radial-gradient-1"></div>
        </hsc-window>

        <hsc-window title="without max{Width,Height}" :resizable="true" :minWidth="200" :minHeight="200">
            <div class="radial-gradient-2"></div>
        </hsc-window>

        <hsc-window title="Scrollable" :resizable="true" :minWidth="100" :minHeight="100" :maxWidth="200" :maxHeight="200">
            <div style="height: 100%; overflow: auto;">
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
            </div>
        </hsc-window>

        Gradation samples from
        <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient">https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient</a>
    </hsc-window-style-metal>
</template>


<style lang="scss" scoped>
.radial-gradient-1 {
    width: 100%;
    height: 100%;
    background-image: radial-gradient(ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%);
}

.radial-gradient-2 {
    width: 100%;
    height: 100%;
    background-image: radial-gradient(farthest-corner at 45px 45px, #FF0000 0%, #0000FF 100%);
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
    background-color: #000
}
</style>


<script lang="ts">
import * as _ from 'lodash'

export default <any>{
    data() {
        return { n: 21 }
    },
    methods: {
        range: _.range,
        hex(x: number) {
            let hex = Math.floor(255 * x).toString(16)
            if (hex.length <= 1)
                hex = `0${hex}`
            return hex
        }
    }
}
</script>
















