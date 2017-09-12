declare function require(moduleName: string): any
declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
}