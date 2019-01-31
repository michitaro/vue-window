import { WindowStyle } from "./style";
import { Vue } from "vue-property-decorator";
export default class  extends Vue {
    windowStyle: WindowStyle;
    disabled: boolean;
    hover: boolean;
    active: boolean;
    readonly style: Partial<CSSStyleDeclaration>;
    mousedown(e: MouseEvent): void;
}
