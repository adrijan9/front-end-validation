# front-end-validation
Validate javascript or typescript objects.

# Example

````javascript
validate({
            email: {
                value: email.value,
                rules: {
                    required: true,
                    email: true
                },
                element: email
            },
            password: {
                value: password.value,
                rules: {
                    required: true
                },
                element: password
            }
        })
            .then(() => {
                // submit form or something else
            })
            .catch(error => {
                const { errors, model } = error;

                // do your things here
            });
````