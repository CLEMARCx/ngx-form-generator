export class Field {
    constructor(
        public name?: string,
        public placeholder?: string,
        public type: string = 'input',
        public color?: string,
        public prefix?: string,
        public suffixValidation: boolean = false,
        public value?: any,
        public disabled: boolean = false,
        public required: boolean = false,
        public autocomplete: string = 'true',
        public validators: any[] = [],
        public size: number = 1,
        public items?: any[],
        public valueField?: string,
        public min?: string,
        public max?: string,
        public step?: string
    ) {}
}
