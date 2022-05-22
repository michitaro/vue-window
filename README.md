# vue-window

😣 This library is not compatible with Vue3! 😣

## Introduction
Recent web applications are mainly for mobile environments. Therefore window UI is no longer mainstream.
However, window UI is still useful for professional web applications for PC environments.
This package is an implementation of window UI for PC environment as a Vue Component.

### [Working Demo](https://michitaro.github.io/vue-window)
### Features
* Window component for vue2
* Windows are draggable
* Automatic z-index control
* Resizable
* z-index group
* Configurable color theme
* Built-in 3 color themes
* Open / Close animation
* Tested on Safari10, Chrome60, Firefox55, IE11, Edge38 For PCs 
* iOS Support 🎉

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
import * as VueWindow from '@hscmap/vue-window'
import '@hscmap/vue-window/main.css'

Vue.use(VueWindow)
```

### CommonJS
```javascript
var Vue = require('vue')
require('@hscmap/vue-window/main.css')
Vue.use(require('@hscmap/vue-window'))
```

### Browser
```html
<html>
	<head>
		<link rel="stylesheet" href="my/path/to/@hscmap/vue-window/lib/main.css"/>
		<script src="my/path/to/vue/dist/vue.js"></script>
		<script src="my/path/to/@hscmap/vue-window/lib/index.js"></script>
		<script>
			Vue.use(VueWindow);
		</script>
	</head>
</html>
```

# Example
```html
<template>
    <hsc-window-style-metal>
        <hsc-window title="Window 1" >
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
    </hsc-window-style-metal>
</template>
```

Other examples are available [here](http://michitaro.github.io/vue-window/).

see also [@hscmap/vue-menu](https://github.com/michitaro/vue-menu).
This is a menu UI component for vue2 with the same color themes.

# Contributing
Any comments, suggestions or PRs are welcome 😀
