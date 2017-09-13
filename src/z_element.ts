export class ZElement {
    zIndex?: number

    constructor(private _group: number, public onChange: (zIndex: number) => void) {
        this.a(a => a.push(this))
    }

    set group(_group: number) {
        this._group = _group
        const a1 = a(this._group)
        const a2 = a(_group)
        a1.splice(a1.indexOf(this), 1)
        a2.push(this)
        refresh()
    }

    get group() {
        return this._group
    }

    unregister() {
        this.a(a => a.splice(a.indexOf(this), 1))
    }

    raise() {
        this.a(a => {
            a.splice(a.indexOf(this), 1)
            a.push(this)
        })
    }

    private a(cb: (a: ZElement[]) => void) {
        cb(a(this._group))
        refresh()
    }
}


const registry = new Map<number, ZElement[]>()


const BASE = 0


function a(group: number) {
    if (!registry.has(group))
        registry.set(group, [])
    return registry.get(group)!
}


function refresh() {
    let zIndex = BASE
    for (const g of keys(registry).sort()) {
        for (const z of a(g)) {
            if (zIndex != z.zIndex) {
                z.zIndex = zIndex
                z.onChange(zIndex)
            }
            zIndex++
        }
    }
}


function keys<T, U>(map: Map<T, U>) {
    const keys: T[] = []
    map.forEach((v, k) => keys.push(k))
    return keys
}