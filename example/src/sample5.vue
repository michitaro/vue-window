<template>
  <div>

    <hsc-window-style-metal>
      <template v-for="i in [1, 2, 3, 4]" , :zGroup="0">
        <hsc-window :key="i" :title="`Base Layer #${i}`">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range" />
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-metal>

    <hsc-window-style-black>
      <template v-for="i in [1, 2, 3, 4]">
        <hsc-window :key="i" :title="`Floating Layer #${i}`" :zGroup="1">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range" />
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-black>

    <p>
      Floating windows always appear in foreground of windows on base layer.
    </p>
  </div>
</template>