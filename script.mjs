
//campos do html a serem completados
const city = document.querySelector('#cityId');
const district = document.querySelector('#districtId');
const street = document.querySelector('#streetId');

//campos do submit
const buttom = document.querySelector('#send');
const cepValue = document.querySelector("#cepName");

const cepRegexSimple = /^[0-9]{8}$/;
const cepRegexTrace = /^[0-9]{5}-[0-9]{3}$/;

//formato de 8 digitos sem traço ou letra
function validateCep(cep){ 
    return cepRegexSimple.test(cep) || cepRegexTrace.test(cep); 
}

function formatCep(cep){
    if(cepRegexTrace.test(cep)){
        return cep.slice(0,5) + cep.slice(6, 9);
    }
    return cep;
}

function requestCep(cep){
    if(validateCep(cep)){
        /*
            considerando um cep válido
            puxa o cep do viacep e executa promise
            finaliza o auto complete
        */
        fetch(`https://viacep.com.br/ws/${formatCep(cep)}/json/`)
            .then(response => response.json())
            .then(resp => changeValuesDOM(
                resp.localidade, resp.bairro, resp.logradouro
            ))
            .catch(error => alert(error));

        cepValue.value = "";
    }
    else alert("Cep inválido.");
}

function changeValuesDOM(
        localidade = "", bairro = "", logradouro = ""){
    city.value = localidade;
    district.value = bairro;
    street.value = logradouro;
}

function getCepValue(submit){
    changeValuesDOM();
    //breka o submit do botão
    submit.preventDefault();
    //executa todo o algoritmo
    requestCep(cepValue.value);
}

buttom.addEventListener("click", getCepValue);
