import Methods from "./Methods";
/**
 * Validator class
 */
declare class Validator extends Methods {
    private model;
    /**
     * Validator constructor
     * @param model
     */
    constructor(model: Record<any, any>);
    /**
     * Handle validation
     */
    handle(): Record<any, any>;
    /**
     * Validate rules
     * @param key
     * @param value
     * @param rules
     */
    validateRules(key: any, value: any, rules: Array<any>): Array<any>;
    /**
     * Get all errors from model
     */
    getAllErrors(): Record<any, any>;
    /**
     * Check if model has errors
     */
    modelHasErrors(): boolean;
    /**
     * Resolve rule name
     * @param name
     */
    resolveRuleName(name: string): string | null;
    /**
     * @param errors
     * @param rules
     */
    bailExist(errors: Array<any>, rules: Record<any, any>): any;
    /**
     * Response
     */
    handleResponse(): {
        status: boolean;
        model: Record<any, any>;
        errors: Record<any, any>;
    };
}
export default Validator;
