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
    
        <template v-for="i in [1, 2, 3, 4, 5]">
            <hsc-window :key="i" :title="`Auto-${i}`">
                <fieldset>
                    <legend>&alpha;</legend>
                    <input type="range" />
                </fieldset>
            </hsc-window>
        </template>
    
    </hsc-window-style-metal>
</template>
