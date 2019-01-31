import Vue, * as vue from 'vue';
export declare type Style = Partial<CSSStyleDeclaration>;
export interface WindowStyle {
    window: Style;
    titlebar: Style;
    content: Style;
    button: Style;
    buttonHover: Style;
    buttonActive: Style;
}
export declare const WINDOW_STYLE_KEY = "@hscmap/vue-window/windowStyle";
export declare function StyleFactory(windowStyle: WindowStyle): vue.ComponentOptions<Vue>;
export declare const StyleBlack: vue.ComponentOptions<Vue>;
export declare const StyleWhite: vue.ComponentOptions<Vue>;
export declare const StyleMetal: vue.ComponentOptions<Vue>;
