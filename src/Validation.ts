import Validator from "./Validator/Validator";

/**
 * Validation class
 */
class Validation {
    /**
     * Validator constructor
     * @param object
     */
    constructor(private object: Record<any, any>) {}

    /**
     * Validate
     * @return Promise<any>
     */
    validate(): Promise<any> {
        return new Promise((resolve, reject) => {
            const validator = (new Validator(this.object)).handle();

            validator.status
                ? resolve(validator)
                : reject(validator);
        });
    }
}

export default Validation;