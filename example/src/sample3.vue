<template>
    <hsc-window-style-white>
    
        <hsc-window title="Center" initialPosition="center">
            <fieldset>
                <legend>&alpha;</legend>
                <input type="range" />
            </fieldset>
        </hsc-window>
    
        <hsc-window title="Right Bottom" initialPosition="-20 / -100">
            <fieldset>
                <legend>&alpha;</legend>
                <input type="range" />
            </fieldset>
        </hsc-window>
    
        <hsc-window title="Bottom Left" initialPosition="20 / -200">
            <fieldset>
                <legend>&alpha;</legend>
                <input type="range" />
            </fieldset>
        </hsc-window>
    
        <hsc-window title="Top Right" initialPosition="-20 / 20">
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
    
    </hsc-window-style-white>
</template>
