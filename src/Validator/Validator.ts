import ArrayHasItems from "../Utils/Array/ArrayHasItems";
import IsObjectEmpty from "../Utils/Object/IsObjectEmpty";
import Isset from "../Utils/Object/Isset";
import Methods from "./Methods";
import UcFirst from "../Utils/String/UcFirst";
import IsFunction from "../Utils/IsFunction";
import IsObject from "../Utils/Object/IsObject";

/**
 * Validator class
 */
class Validator extends Methods {
    /**
     * Validator constructor
     * @param model
     */
    constructor(private model: Record<any, any>) {
        super();
    }

    /**
     * Handle validation
     */
    handle(): Record<any, any> {
        if(!IsObject(this.model)) {
            throw new Error("Value is not object or null!");
        }

        if (IsObjectEmpty(this.model)) {
            throw new Error("Object cannot be empty!");
        }

        for (const key in this.model) {
            const model = this.model[key],
                value = model.value,
                rules = model.rules,
                errors = this.validateRules(key, value, rules);

            this.model[key]["errors"] = errors;

            if(this.bailExist(errors, rules)) {
                return this.handleResponse();
            }
        }

        return this.handleResponse();
    }

    /**
     * Validate rules
     * @param key
     * @param value
     * @param rules
     */
    validateRules(key: any, value: any, rules: Array<any>): Array<any> {
        if (ArrayHasItems(rules)) {
            throw new Error("Rules must be defined!");
        }

        let tmpModel: Array<any> = [];
        for (const ruleKey in rules) {
            const ruleValue = rules[ruleKey],
                ruleFunctionName = this.resolveRuleName(ruleKey);

            if(!ruleFunctionName) {
                throw new Error("Value is not string!");
            }

            const ruleResolver = this.methods[ruleFunctionName];

            if (this.excluded.indexOf(ruleKey) !== -1) {
                if(!IsFunction(ruleResolver)) {
                    throw new Error(`${ruleFunctionName} rule does not exists.`);
                }

                const passes = ruleResolver(ruleValue, value, key, this.model);

                if (!passes.status) {
                    tmpModel = [
                        ...tmpModel,
                        passes.message
                    ];
                }
            }
        }

        return tmpModel;
    }

    /**
     * Get all errors from model
     */
    getAllErrors() {
        let errors: Record<any, any> = {};
        for (const item in this.model) {
            const currentItem = this.model[item];

            if (!!currentItem.errors.length) {
                errors = {
                    ...errors,
                    [item]: currentItem.errors
                };
            }
        }
        return errors;
    }

    /**
     * Check if model has errors
     */
    modelHasErrors(): boolean {
        return IsObjectEmpty(this.getAllErrors());
    }

    /**
     * Resolve rule name
     * @param name
     */
    resolveRuleName(name: string): string|null {
        return UcFirst(name);
    }

    /**
     * @param errors
     * @param rules
     */
    bailExist(errors: Array<any>, rules: Record<any, any>){
        if(errors.length > 0 && Isset(rules, this.BAIL)) {
            return this.handleResponse();
        }
        return {
            status: true,
            errors: [],
            model: this.model
        };
    }

    /**
     * Response
     */
    handleResponse() {
        return {
            status: this.modelHasErrors(),
            model: this.model,
            errors: this.getAllErrors()
        };
    }
}

export default Validator;