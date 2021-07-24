/**
 * Validation class
 */
declare class Validation {
    private object;
    /**
     * Validator constructor
     * @param object
     */
    constructor(object: Record<any, any>);
    /**
     * Validate
     * @return Promise<any>
     */
    validate(): Promise<any>;
}
export default Validation;
