<template>
    <hsc-window-style-black>
    
        <hsc-window title="Window 1" :closeButton="true">
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
    
        <hsc-window title="Window 2" :closeButton="true">
            Parameters:
            <fieldset>
                <legend>&gamma;</legend>
                <input type="range" />
            </fieldset>
            <fieldset>
                <legend>&delta;</legend>
                <input type="range" />
            </fieldset>
        </hsc-window>
    
    </hsc-window-style-black>
</template>