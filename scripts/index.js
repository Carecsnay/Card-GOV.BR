//Regras de preenchimento para campo Nome
const inputName = document.getElementById('name');
const maskName = IMask(inputName, {
    mask: /^[a-zA-Z ]+$/,
});

//Regras de preenchimento para campo CPF
const inputCPF = document.getElementById("cpf");
const maskOptions = {
    mask: "000.000.000-00",
};
const maskCPF = IMask(inputCPF, maskOptions);

//Adiciona um evento de escuta que executa o código depois do input perder o foco no input nome
const inputPassword = document.getElementById("password");
inputName.addEventListener("change", function () {
    const nameValue = this.value;
    if (nameValue) {
        const firstName = nameValue.split(" ")[0]; //Separa a primeira palavra do nome do sobrenome

        const firstLetter = firstName.charAt(0).toUpperCase(); //Coloca a primeira letra em maiusculo
        const restOfName = firstName.slice(1).toLowerCase(); //Coloca da segunda letra em diante em minusculo
        inputPassword.value = `${firstLetter}${restOfName}@1234`; //Cocatena as duas constantes
    }
    if (nameValue == ''){
        inputPassword.value = '';
        inputCPF.value = '';
    }

});