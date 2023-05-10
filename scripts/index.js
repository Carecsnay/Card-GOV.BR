const element = document.getElementById("mask");
const maskOptions = {
    mask: "000.000.000-00",
};
const maskCPF = IMask(element, maskOptions);

const input = document.getElementById('name');
const maskName = IMask(input, {
    mask: /^[a-zA-Z ]+$/,
});

//PEGAR PRIMEIRO NOME
const inputName = document.getElementById("name");

inputName.addEventListener("blur", function () {
    const nameValue = this.value;
    if (nameValue) {
        const firstName = nameValue.split(" ")[0];

        //INSERIR PRIMEIRO NOME NO CAMPO PASSWORD
        const inputPassword = document.getElementById("password");
        const firstLetter = firstName.charAt(0).toUpperCase();
        const restOfName = firstName.slice(1).toLowerCase();
        inputPassword.value = `${firstLetter}${restOfName}@1234`;
    }
});