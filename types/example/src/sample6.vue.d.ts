import { Vue } from 'vue-property-decorator';
export declare class NumberWindow {
    readonly n: number;
    private static id;
    id: number;
    isOpen: boolean;
    constructor(n?: number);
    readonly label: string;
}
export default class Sample6 extends Vue {
    numberWindows: NumberWindow[];
    newRandomNumber(): void;
}
