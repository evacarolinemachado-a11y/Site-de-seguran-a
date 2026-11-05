
/* =================================
   AUMENTAR E DIMINUIR FONTES
================================= */

let tamanhoFonteAtual = 16;

const valorAdicionado = 2;
const valorSubtraido = 2;

const tamanhoMinimo = 12;
const tamanhoMaximo = 30;

let btnAumentaFonte = document.getElementById("btnAumentaTexto");
let btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

btnAumentaFonte.addEventListener("click", aumentaFonte);
btnDiminuiFonte.addEventListener("click", diminuiFonte);

function aumentaFonte() {

    if (tamanhoFonteAtual < tamanhoMaximo) {

        tamanhoFonteAtual += valorAdicionado;

        document.documentElement.style.fontSize =
            tamanhoFonteAtual + "px";
    }
}

function diminuiFonte() {

    if (tamanhoFonteAtual > tamanhoMinimo) {

        tamanhoFonteAtual -= valorSubtraido;

        document.documentElement.style.fontSize =
            tamanhoFonteAtual + "px";
    }
}


/* =================================
   LEITURA EM VOZ ALTA
================================= */

let lendo = false;

const btnLeitura = document.getElementById("btn-voz");
const btnParar = document.getElementById("btn-parar");

let fala = null;

btnLeitura.addEventListener("click", lerEmVozAlta);
btnParar.addEventListener("click", pararLeitura);


function lerEmVozAlta() {

    // Se já estiver lendo, pausa ou continua
    if (lendo === true) {

        if (speechSynthesis.paused === true) {

            speechSynthesis.resume();

            btnLeitura.innerText = "⏸ Pausar leitura";

        } else {

            speechSynthesis.pause();

            btnLeitura.innerText = "▶ Continuar leitura";
        }

        return;
    }

    // Captura o conteúdo principal
    let conteudo = document.querySelector("main");

    let texto = conteudo.innerText;

    // Cria a leitura
    fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    fala.rate = 0.9;
    fala.pitch = 1;

    fala.onend = finalizarLeitura;
    fala.onerror = finalizarLeitura;

    // Inicia a leitura
    speechSynthesis.cancel();

    speechSynthesis.speak(fala);

    lendo = true;

    btnLeitura.innerText = "⏸ Pausar leitura";
}


/* =================================
   FINALIZAR LEITURA
================================= */

function finalizarLeitura() {

    lendo = false;

    btnLeitura.innerText = "🔊 Ouvir Página";
}


/* =================================
   PARAR LEITURA
================================= */

function pararLeitura() {

    speechSynthesis.cancel();

    lendo = false;

    btnLeitura.innerText = "🔊 Ouvir Página";
}
