'use strict';

// make sentence title case
function titleCase(string)
{
    let sentence = string.toLowerCase().split(" ");

    for(let i = 0; i < sentence.length; i++)
    {
       sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    return sentence.join(' ');
 }

// error message
// function setError(element, message)
// {
//     const formControl = element.parentElement;
//     const errorDisplay = formControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     formControl.classList.add('error');
//     formControl.classList.remove('success');
// }

function displayError(input, element, message)
{
    element.textContent = message;
    element.style.color = 'red';
    input.style.border = '2px solid red';
}

function displaySuccess(input, element, message)
{
    element.textContent = message;
    input.style.border = '2px solid green';
}

// validate form
const inputs = document.querySelectorAll('input');
//console.log(inputs.length)

function validateForm()
{
    inputs.forEach(input => {
        // input.style.border = '1px solid hsl(223, 7%, 63%)';
        let nameAttribute = input.getAttribute('name');
        input.value.trim();
        if(input.value === '')
        {
            if(nameAttribute.includes('-'))
            {
                // replace - in name attribute with ' '
                nameAttribute = nameAttribute.replace('-', ' ');

                displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} cannot be empty`);
                
            }
            else
            {
                displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} cannot be empty`);
            }          
        }
        else
        {

            // console.log(nameAttribute);
            if(nameAttribute === 'first-name')
            {
                // replace - in name attribute with ' '
                nameAttribute = nameAttribute.replace('-', ' ');

                // check length of value in input field
                // console.log(`inputname: ${nameAttribute}`, `input value length: ${input.value.length}`);
                if(input.value.length > 3 && input.value.length < 20)
                {
                    // console.log('first name between 5 and 20 chars');
                    displaySuccess(input, input.nextElementSibling, '');
                }
                else
                {
                    // console.log('first name not between 5 and 20 chars');
                    displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} must be between 3 and 20 characters`);
                }
            }

            else if(nameAttribute === 'last-name')
            {
                nameAttribute = nameAttribute.replace('-', ' ');
                if(input.value.length > 3 && input.value.length < 20)
                {
                    // console.log(`${nameAttribute} between 5 and 20 chars`);
                    displaySuccess(input, input.nextElementSibling, '');
                }
                else
                {
                    // console.log(`${nameAttribute} between 5 and 20 chars`);
                    displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} must be between 3 and 20 characters`);
                }
            }

            else if(nameAttribute === 'email')
            {
                if(input.value.includes('@') && input.value.endsWith('.com'))
                {
                    displaySuccess(input, input.nextElementSibling, '');
                }
                else
                {
                    displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} not valid`);
                }
            }

            // NOT WORKING
            else if(nameAttribute === 'phone-number')
            {
                nameAttribute = nameAttribute.replace('-', ' ');
                const regEx = '/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im';
                if(input.value.match(regEx))
                {
                    displaySuccess(input, input.nextElementSibling, '');
                }
                else
                {
                    displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} not valid`);
                }
            }

            else if(nameAttribute === 'password')
            {
                if(input.value.length < 5)
                {
                    displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} must be more than 5 characters`);
                }
                else
                {
                    displaySuccess(input, input.nextElementSibling, '');
                }
            }

            else if(nameAttribute === 'confirm-password')
            {
                nameAttribute = nameAttribute.replace('-', ' ');

                // check if length is equal to password length
                let passwordValue = document.querySelector('input[name=password]').value;
                console.log(passwordValue);

                if(input.value.length > 5)
                {
                    if(passwordValue.length === input.value.length)
                    {
                        if(passwordValue === input.value)
                        {
                            displaySuccess(input, input.nextElementSibling, '');
                        }
                    }
                    else
                    {
                        displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} does not match password`);
                    }
                }
                else
                {
                    displayError(input, input.nextElementSibling, `${titleCase(nameAttribute)} must be more than 5 characters`);
                }
            }
        }
    });
}

const createAccountBtn = document.querySelector('.create-account-btn');

createAccountBtn.addEventListener('click', validateForm);
