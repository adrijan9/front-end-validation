import Validation from "./Validation";

function validate(object: Record<any, any>): Promise<any> {
    return (new Validation(object)).validate();
}

export {
    validate
};