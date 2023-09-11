(function init(){
    "use strict";

    // variable for bottom "submit"
    const submit = document.querySelector("[type='submit']");
    // variable for bottom "reset"
    const reset = document.querySelector("[type='reset']");
    // variable for all inputs in the form
    const inputs = document.querySelectorAll("form input");
    // variable for all selects in the form
    const selects = document.querySelectorAll("form select");
    // variable for all textareas in the form
    const textareas = document.querySelectorAll("form textarea");
    // variable for form-selector
    const form = document.querySelector("form");

    // valiables for fields required to fill in and their attributes for verify validity
    const fname = document.getElementById("fName");
    const lname = document.getElementById("lName");
    const mail = document.getElementById("mail");

    const init = () => {
        const inputsRequired = document.querySelectorAll('input[required]');
        inputsRequired.forEach((el) => {
            el.addEventListener('blur', (e) => {
                const el = e.target;
                el.setCustomValidity('');
                let err = '';
                switch (el.id) {
                    case 'fName':
                        err = checkNameValid(el, el.name) === '' ? '' : checkNameValid(el, el.name);
                        break;
                    case 'lName':
                        err = checkNameValid(el, el.name) === '' ? '' : checkNameValid(el, el.name);
                        break;
                    case 'mail':
                        err = checkEmailValid(el) === '' ? '' : checkEmailValid(el);
                        break;
                    default:
                        break;
                }
                const tagMessageId = el.parentElement.id + "Mess";
                const errorMessage = document.getElementById(tagMessageId);
                if (!el.checkValidity() || (!el.checkValidity() && errorMessage)) {
                    removeMessForm(tagMessageId);
                    messageOutputValid(err, el.parentElement.id, "messageText");
                } else if (err === '' && errorMessage) {
                    removeMessForm(tagMessageId);
                }
            });
        });

        // actions to the submit-button
        submit.addEventListener("click", (e) => {
            e.preventDefault();

            outputAllElementsForm();
            removeMessFormAll('.messageText');
            removeMessFormAll('.messageSuccess');
            if (validate()) {
                outputFilledElementsForm();
                messageOutputValid("Liebe(r)  " + fname.value + "! Vielen Dank für Ihre Rückmeldung! Wir werden uns so bald wie möglich mit Ihnen in Verbindung setzen. ", "form", "messageSuccess");
                form.reset();
            }
        }, false);

        // actions to the reset-button
        reset.addEventListener("click", (e) => {
            removeMessFormAll('.messageText');
            removeMessFormAll('.messageSuccess');
            form.reset();
        });
    };

    // Output all fields' elements and their values
    const outputAllElementsForm = () => {
        // put all values from inputs
        const resultForm = [];
        inputs.forEach(input => {
            resultForm.push({
                tag: input,
                value: input.value
            });
        });
        // put all values from selects
        selects.forEach(select => {
            const values = [];
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].selected) {
                    values.push(select.options[i].value);
                }
            }
            resultForm.push({
                tag: select,
                value: values
            });
        });
        // put all values from textareas
        textareas.forEach(text => {
            resultForm.push({
                tag: text,
                value: text.value
            });
        });
        // output all values
        resultForm.forEach(function (element) {
            console.log(element);
        });
    }

    // Output only filled fields and their values
    const outputFilledElementsForm = () => {
        const resultForm = [];
        // put all values from inputs
        inputs.forEach(input => {
            if (input.value) {
                resultForm.push({
                    name: input.id,
                    value: input.value
                });
            }
        });
        // put all values from selects
        selects.forEach(select => {
            if (select.value) {
                const values = [];
                for (let i = 0; i < select.options.length; i++) {
                    if (select.options[i].selected) {
                        values.push(select.options[i].value);
                    }
                }
                resultForm.push({
                    name: select.id,
                    value: values
                });
            }
        });
        // put all values from textareas
        textareas.forEach(text => {
            if (text.value) {
                resultForm.push({
                    name: text.id,
                    value: text.value
                });
            }
        });
        // output all values
        resultForm.forEach(function (element) {
            console.log(element);
        });
    }

    const removeMessForm = (messageId) => {
        if (document.getElementById(messageId)) {
            document.getElementById(messageId).remove();
        }
    }

    const removeMessFormAll = (messageClass) => {
        const messages = document.querySelectorAll(messageClass);
        messages.forEach(message => {
            message.remove();
        });
    }

    const messageOutputValid = (message, idParent, classMess) => {
        if (message !== "") {
            const parent = document.getElementById(idParent);
            // create new element ("p" - selector for a message)
            let messageText = document.createElement("p");
            // create text-value of a message
            let text = document.createTextNode(message);
            // add text to the message
            messageText.appendChild(text);
            // add class (for styling) and id (for separate removing of the messages-tags)
            messageText.setAttribute("class", classMess);
            messageText.setAttribute("id", idParent + "Mess");
            // add message to the form
            parent.appendChild(messageText);
            return true;
        } else {
            return false;
        }
    }

    const validate = () => {
        let error = 0;
        if (messageOutputValid(checkNameValid(fname, fname.name), fname.parentElement.id, "messageText"))
            error++;
        if (messageOutputValid(checkNameValid(lname, lname.name), lname.parentElement.id, "messageText"))
            error++;
        if (messageOutputValid(checkEmailValid(mail), mail.parentElement.id, "messageText"))
            error++;
        if (error === 0)
            return true;
    };

})();