# vue-window
# Introduction
## [Working Demo](https://michitaro.github.io/vue-window)
## Features
* Menu component for vue2
* Deeply nested menu supported
* Props "checked" & "disabled"
* Keybinds
* Y-scrollable if necessary
* Contextmenu
* Builtin 2 themes (black & white)
* Customizable color
* Menuitem can contain any HTML not only text
* Tested on Safari10, Chrom60, Firefox55, IE11, Edge38 for PCs
* Does not work on mobile devices 😞

![Screenshot](./docs/screenshot.png)

# Usage
## Install
```sh
npm install --save @hscmap/vue-window
```

## Setup

### ES6 / TypeScript
```typescript
import Vue from 'vue'
import * as hscmapMenu from '@hscmap/vue-window'

Vue.use(hscmapMenu)
```

### CommonJS
```javascript
var Vue = require('vue')
Vue.use(require('@hscmap/vue-window'))
```

# Example
```html
<template>
    <hsc-menu-style-white>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
            <hsc-menu-bar-item label="File">
                <hsc-menu-item label="New" @click="window.alert('New')" />
                <hsc-menu-item label="Open" @click="window.alert('Open')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Save" @click="window.alert('Save')" :disabled="true" />
                <hsc-menu-item label="Export to">
                    <hsc-menu-item label="PDF" />
                    <hsc-menu-item label="HTML" />
                </hsc-menu-item>
            </hsc-menu-bar-item>
            <hsc-menu-bar-item label="Edit">
                <hsc-menu-item label="Undo" keybind="meta+z" @click="window.alert('Undo')" />
                <hsc-menu-separator/>
                <hsc-menu-item label="Cut" keybind="meta+x" @click="window.alert('Cut')" />
                <hsc-menu-item label="Copy" keybind="meta+c" @click="window.alert('Copy')" />
                <hsc-menu-item label="Paste" keybind="meta+v" @click="window.alert('Paste')" :disabled="true" />
            </hsc-menu-bar-item>
        </hsc-menu-bar>
    </hsc-menu-style-white>
</template>
```
Other examples are available [here](http://michitaro.github.io/vue-window/).
