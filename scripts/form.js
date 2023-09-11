"use strict"

document.addEventListener('DOMContentLoaded', function (){
    const form = document.getElementById('form');
    form.addEventListener('submit',formSend);
    form.addEventListener('reset',formReset);

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if(error===0){
            form.classList.add('_sending');
            let response = await fetch('sendmail.php',{
                method: 'POST',
                body:formData
            });
            if(response.ok){
                let result = await  response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('ERROR!!');
                form.classList.remove('_sending');
            }
        } else {
            alert('Please fill out the required fields correctly/ Bitte füllen Sie die erforderlichen Felder korrekt aus');
        }
    }

    function formReset() {
        form.reset();
        formRemoveErrorAll();
    }

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }
            } else if(input.classList.contains('_formName')){
                if(nameTest(input)){
                    formAddError(input);
                    error++;
                }
            }
            else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }else {
                if(input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function formRemoveErrorAll() {
        const errorElements = document.querySelectorAll('._error');
        errorElements.forEach(function (element) {
            element.classList.remove('_error');
        });
    }

    //function for testing email
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function nameTest(input){
        return !/^[A-Za-z\s-']{1,26}$/.test(input.value);
    }
});