let listaNumerosSorteados = [];
let numeroLimite = 50; 
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1 ;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector (tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial () {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escreva um número de 1 a 10');
}

exibirMensagemInicial();

function verificarChute(){
  let chute = document.querySelector('input').value;
  if(chute == numeroSecreto){
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativa = `Parabéns, você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela ('p', mensagemTentativa);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
      if (chute > numeroSecreto){
      exibirTextoNaTela ('p', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
     }
    tentativas++; 
    limparCampo();
  }
}

function gerarNumeroSecreto() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

  if(quantidadeDeElementosNaLista == numeroLimite){
    listaNumerosSorteados = [];
  }
  
  if(listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroSecreto();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log (listaNumerosSorteados);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroSecreto();
  limparCampo();
  tentativas = 1;  
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}