<template>
  <div>
    <hsc-window-style-metal>
      <template v-for="i in [1, 2, 3]">
        <hsc-window :key="i" :title="`No offset #${i}`" :zGroup="0">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range"/>
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-metal>

    <hsc-window-style-metal>
      <template v-for="i in [1, 2, 3]">
        <hsc-window :key="i" :title="`No offset-2 #${i}`" :zGroup="1">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range"/>
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-metal>

    <hsc-window-style-black>
      <template v-for="i in [1, 2, 3]">
        <hsc-window :key="i" :title="`Offset 50- #${i}`" :zGroup="2" :zOffset="50">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range"/>
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-black>

    <hsc-window-style-white>
      <template v-for="i in [1, 2, 3]">
        <hsc-window :key="i" :title="`Offset 100- #${i}`" :zGroup="3" :zOffset="100">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range"/>
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-white>

    <p>
      Floating windows always appear in foreground of windows on base layer.
    </p>

    <div style="width: 100px; height: 100px; background-color: darkred; z-index: 50; position: absolute; left: calc(100vw / 2 - 50px); top: calc(100vh / 2 - 50px)">
      z-index: 50
    </div>
  </div>
</template>