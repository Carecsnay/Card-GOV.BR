//Regras de preenchimento para campo Nome
const inputName = document.getElementById('name');
const inputPassword = document.getElementById("password");
const inputCPF = document.getElementById("cpf");
const titleElement = document.querySelector("title");
const button = document.getElementById('botao');

const maskName = IMask(inputName, {
  mask: /^[a-zA-Z .ÇçéÉóÓãÃ]+$/,
});

//Mascara de preenchimento para campo CPF
const maskOptions = {
  mask: "000.000.000-00",
}
const maskCPF = IMask(inputCPF, maskOptions);

//Adiciona um evento de escuta que executa o código depois do input perder o foco no input nome
inputName.addEventListener("input", function () {
  const nameValue = this.value;
  if (nameValue) {
    const firstName = nameValue.split(" ")[0]; //Separa a primeira palavra do nome do sobrenome

    const firstLetter = firstName.charAt(0).toUpperCase(); //Coloca a primeira letra em maiusculo
    const restOfName = firstName.slice(1).toLowerCase(); //Coloca da segunda letra em diante em minusculo
    inputPassword.value = `${firstLetter}${restOfName}@1234`; //Cocatena as duas constantes
  }
  if (nameValue == '') {
    inputCPF.value = '';
    inputPassword.value = '';
  }
});

inputCPF.addEventListener('change', function () {
  inputCPF.classList.remove("invalid");
})

inputName.addEventListener('change', function () {
  inputName.classList.remove("invalid");
})

// Regras de validação do CPF
function validateCPF(cpf) {
  // Remover caracteres especiais do CPF
  cpf = cpf.replace(/[^\d]/g, '');

  // Verificar se o CPF possui 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calcular o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let mod = sum % 11;
  let digit1 = mod < 2 ? 0 : 11 - mod;

  // Verificar o primeiro dígito verificador
  if (parseInt(cpf.charAt(9)) !== digit1) {
    return false;
  }

  // Calcular o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  mod = sum % 11;
  let digit2 = mod < 2 ? 0 : 11 - mod;

  // Verificar o segundo dígito verificador
  if (parseInt(cpf.charAt(10)) !== digit2) {
    return false;
  }

  // CPF válido
  return true;
}

function printDocument() {
  const cpf = inputCPF.value;
  const nome = inputName.value.trim(); // Remove espaços em branco do início e do fim

  if (nome === '') {
    // Campo de nome vazio, modificar a aparência do campo de entrada
    inputName.classList.add('invalid');
    return; // Encerra a função para evitar a impressão do documento
  } else {
    // Campo de nome preenchido, remover a classe 'invalid' (se estiver presente)
    inputName.classList.remove('invalid');
  }

  if (validateCPF(cpf)) {
    // CPF válido, executar a lógica de impressão
    titleElement.textContent = nome.toUpperCase() || 'Card GOV.BR';
    setTimeout(function () {
      window.print();
    }, 500);
  } else {
    // CPF inválido, modificar a aparência do campo de entrada
    inputCPF.classList.add('invalid');
  }
}

button.addEventListener('click', printDocument);

document.addEventListener('keydown', function(event) {
  // Verifica se as teclas Ctrl + P foram pressionadas
  if (event.key === 'p' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault(); // Não executar o comando de impressão padrão do navegador
    printDocument();
  }
});

