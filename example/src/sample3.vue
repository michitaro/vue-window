<template>
  <hsc-window-style-metal>

    <hsc-window title="Center" positionHint="center">
      <fieldset>
        <legend>&alpha;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

    <hsc-window title="Right Bottom" positionHint="-20 / -100">
      <fieldset>
        <legend>&alpha;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

    <hsc-window title="Bottom Left" positionHint="20 / -200">
      <fieldset>
        <legend>&alpha;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

    <hsc-window title="Top Right" positionHint="-20 / 20">
      <fieldset>
        <legend>&alpha;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

    <template v-for="i in [1, 2, 3, 4]">
      <hsc-window :key="i" :title="`Auto-${i}`">
        <fieldset>
          <legend>&alpha;</legend>
          <input type="range" />
        </fieldset>
      </hsc-window>
    </template>

    <hsc-window title="Sync-A" :left.sync="x" :top.sync="y">
      <fieldset>
        <legend>&alpha;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

    <hsc-window title="Sync-B" :left="x + 200" :top="y">
      <fieldset>
        <legend>&alpha;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

  </hsc-window-style-metal>
</template>


<script>
export default {
  data() {
    return {
      x: null,
      y: null,
    }
  }
}
</script>
