<template>
    <div style="position: fixed; top:0; left:0;" :style="{ zIndex }">
        <slot />
    </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator"
const BASE_Z_INDEX = 1


const registry = new Map<number, ZIndex[]>()


function keys<T, U>(map: Map<T, U>) {
    const keys: T[] = []
    map.forEach((v, k) => keys.push(k))
    return keys
}


function applyZIndex(group: number) {
    let zIndex = BASE_Z_INDEX
    for (const k of keys(registry).sort()) {
        for (const z of registry.get(k)!) {
            z.zIndex = `${zIndex}`
            zIndex++
        }
    }
}


@Component
export default class ZIndex extends Vue {
    @Prop({ type: Number, default: 0 })
    group: number

    zIndex = 'auto'

    private a() {
        const g = this.group
        if (!registry.has(g))
            registry.set(g, [])
        return registry.get(g)!
    }

    mounted() {
        this.a().push(this)
        applyZIndex(this.group)
    }

    beforeDestroy() {
        const a = this.a()
        a.splice(a.indexOf(this), 1)
    }

    raise() {
        const a = this.a()
        a.splice(a.indexOf(this), 1)
        a.push(this)
        applyZIndex(this.group)
    }

    @Watch('group')
    onGroupChange() {
        console.error("prop 'group' can't be changed")
    }
}
</script>