//Regras de preenchimento para campo Nome
const inputName = document.getElementById('name');
const inputPassword = document.getElementById("password");
const inputCPF = document.getElementById("cpf");
const titleElement = document.querySelector("title");
const button = document.getElementById('button');
const modal = document.getElementById("modal");
const buttonModal = document.getElementById("button");
const contentModal = document.querySelector('.modal-content');



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
  if (inputName) {
    const firstName = inputName.value.split(" ")[0]; //Separa a primeira palavra do nome do sobrenome
    const firstLetter = firstName.charAt(0).toUpperCase(); //Coloca a primeira letra em maiúsculo
    const restOfName = firstName.slice(1).toLowerCase(); //Coloca da segunda letra em diante em minusculo  

    inputCPF.addEventListener("input", function () {
      if (inputCPF.value.length >= 14) { //conta os "." e "-"
        const firstTwoNumbersCPF = inputCPF.value.substring(0, 2);
        const lastTwoNumbersCPF = inputCPF.value.substring(inputCPF.value.length - 2);
        inputPassword.value = `${firstLetter}${restOfName}@${firstTwoNumbersCPF}${lastTwoNumbersCPF}`; //Concatena as duas constantes
      }
    })
  }

  if (inputName.value == '') {
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
  if (modal.parentNode) { // Remove modal quando clica em imprimir
    modal.parentNode.removeChild(modal)
  }

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
  }
  else {
    // CPF inválido, modificar a aparência do campo de entrada
    inputCPF.classList.add('invalid');
  }

}

button.addEventListener('click', printDocument);

document.addEventListener('keydown', function (event) {
  // Verifica se as teclas Ctrl + P foram pressionadas
  if (event.key === 'p' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault(); // Não executar o comando de impressão padrão do navegador
    printDocument();
  }
});

// Encontra o elemento que fecha o modal
let close = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão, abre o modal
buttonModal.onclick = function () {
  modal.style.display = "block";
}

// Quando o usuário clicar no 'x', fecha o modal
close.onclick = function () {
  modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, também fecha o modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Função para copiar a chave PIX para a área de transferência
function copyToClipboard() {
  // Seleciona o elemento que contém a chave PIX
  let pixKey = "00020126580014br.gov.bcb.pix0136453b49ed-b585-4cff-84a6-bfc5db92ae5d5204000053039865802BR5925BRUNO BENICIO DE ANDRADE 6011CAMPO MAIOR62110507CardGov63047622";
  navigator.clipboard.writeText(pixKey)
    .then(function () {
      // Exibe uma mensagem temporária na tela
      let copyMessage = document.getElementById("copyMessage");
      copyMessage.textContent = "Chave PIX copiada para a área de transferência!";
      copyMessage.classList.add("show");

      // Oculta a mensagem após 3 segundos
      setTimeout(function () {
        copyMessage.textContent = "";
        copyMessage.classList.remove("show");
      }, 3000);
    })
    .catch(function (err) {
      console.error('Erro ao copiar: ', err);
      // Exibe uma mensagem de erro temporária na tela
      let copyMessage = document.getElementById("copyMessage");
      copyMessage.textContent = "Erro ao copiar a chave PIX. Por favor, copie manualmente.";
      copyMessage.classList.add("show");

      // Oculta a mensagem após 3 segundos
      setTimeout(function () {
        copyMessage.textContent = "";
        copyMessage.classList.remove("show");
      }, 3000);
    });
}
