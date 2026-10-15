const cargos = [
  {
    nome: "DEPUTADO FEDERAL",
    digitos: 4,
    candidatos: {
      "2222": {
        nome: "LUKÃO",
        partido: "PL",
        foto: "https://f.i.uol.com.br//folha/eleicoes/2026/ce/ceara/6_1137508.jpg"
      },
      "1313": {
        nome: "ADELITA MONTEIRO",
        partido: "PT",
        foto: "fotos/adelita.jpg"
      },
      "1277": {
        nome: "ADAIL JR.",
        partido: "PDT",
        foto: "fotos/adail-jr.jpg"
      }
    }
  },
  {
    nome: "DEPUTADO ESTADUAL",
    digitos: 5,
    candidatos: {
      "22022": {
        nome: "BELA CARMELO",
        partido: "PL",
        foto: "fotos/bela-carmelo.jpg"
      },
      "44000": {
        nome: "ABDIAS FILHO",
        partido: "UNIÃO",
        foto: "fotos/abdias-filho.jpg"
      },
      "50500": {
        nome: "AILTON LOPES",
        partido: "PSOL",
        foto: "fotos/ailton-lopes.jpg"
      }
    }
  },
  {
    nome: "1º SENADOR",
    digitos: 3,
    candidatos: {
      "400": {
        nome: "CID GOMES",
        partido: "PSB",
        foto: "fotos/cid-gomes.jpg"
      },
      "180": {
        nome: "LUIZIANNE",
        partido: "REDE",
        foto: "fotos/luizianne.jpg"
      },
      "222": {
        nome: "ALCIDES FERNANDES",
        partido: "PL",
        foto: "fotos/alcides-fernandes.jpg"
      }
    }
  },
  {
    nome: "2º SENADOR",
    digitos: 3,
    candidatos: {
      "400": {
        nome: "CID GOMES",
        partido: "PSB",
        foto: "fotos/cid-gomes.jpg"
      },
      "180": {
        nome: "LUIZIANNE",
        partido: "REDE",
        foto: "fotos/luizianne.jpg"
      },
      "222": {
        nome: "ALCIDES FERNANDES",
        partido: "PL",
        foto: "fotos/alcides-fernandes.jpg"
      }
    }
  },
  {
    nome: "GOVERNADOR",
    digitos: 2,
    candidatos: {
      "45": {
        nome: "CIRO GOMES",
        partido: "PSDB",
        foto: "https://upload.wikimedia.org/wikipedia/commons/3/34/Presidente_Ciro_Gomes.png"
      },
      "13": {
        nome: "ELMANO DE FREITAS",
        partido: "PT",
        foto: "fotos/elmano.jpg"
      },
      "30": {
        nome: "VERA LÚCIA",
        partido: "NOVO",
        foto: "fotos/vera-lucia.jpg"
      },
      "14": {
        nome: "DELEGADO HUGGO",
        partido: "MISSÃO",
        foto: "fotos/delegado-huggo.jpg"
      }
    }
  },
  {
    nome: "PRESIDENTE",
    digitos: 2,
    candidatos: {
      "13": {
        nome: "LULA",
        partido: "PT",
        foto: "fotos/lula.jpg"
      },
      "22": {
        nome: "FLÁVIO BOLSONARO",
        partido: "PL",
        foto: "fotos/flavio-bolsonaro.jpg"
      },
      "55": {
        nome: "RONALDO CAIADO",
        partido: "PSD",
        foto: "fotos/ronaldo-caiado.jpg"
      },
      "30": {
        nome: "ROMEU ZEMA",
        partido: "NOVO",
        foto: "fotos/romeu-zema.jpg"
      }
    }
  }
];
let etapa = 0;
let numeroDigitado = "";
let votoBrancoSelecionado = false;
let cpfAtual = "";

const cpfsUtilizados = new Set();

const elemento = id => document.getElementById(id);

function entrarNaUrna() {
  const cpf = elemento("cpf").value.trim();
  const mensagem = elemento("mensagemCPF");

  if (!/^\d{11}$/.test(cpf)) {
    mensagem.textContent = "Digite 11 números para o CPF fictício.";
    return;
  }

  if (cpfsUtilizados.has(cpf)) {
    mensagem.textContent = "Este CPF já foi usado nesta sessão.";
    return;
  }

  cpfAtual = cpf;
  etapa = 0;

  elemento("telaCPF").hidden = true;
  elemento("telaFinal").hidden = true;
  elemento("telaUrna").hidden = false;

  prepararCargo();
}

function prepararCargo() {
  numeroDigitado = "";
  votoBrancoSelecionado = false;

  const cargo = cargos[etapa];

  elemento("progresso").textContent =
    `Cargo ${etapa + 1} de ${cargos.length}`;

  elemento("cargo").textContent = cargo.nome;
  elemento("numero").textContent = "";
  elemento("nome").textContent = "Digite o número";
  elemento("partido").textContent = "";
  elemento("mensagem").textContent = "";

  const foto = elemento("foto");
  foto.hidden = true;
  foto.removeAttribute("src");
  foto.alt = "Foto do candidato";
}

function digitarNumero(numero) {
  if (votoBrancoSelecionado) return;

  const cargo = cargos[etapa];

  if (numeroDigitado.length >= cargo.digitos) return;

  numeroDigitado += numero;
  elemento("numero").textContent = numeroDigitado;

  mostrarCandidato();
}

function mostrarCandidato() {
  const cargo = cargos[etapa];
  const nome = elemento("nome");
  const partido = elemento("partido");
  const mensagem = elemento("mensagem");
  const foto = elemento("foto");

  nome.textContent = "";
  partido.textContent = "";
  foto.hidden = true;
  foto.removeAttribute("src");
  mensagem.textContent = "";

  if (numeroDigitado.length < cargo.digitos) {
    return;
  }

  const candidato = cargo.candidatos[numeroDigitado];

  if (!candidato) {
    nome.textContent = "NÚMERO NÃO CADASTRADO";
    mensagem.textContent = "Aperte CORRIGE para tentar novamente.";
    return;
  }

  nome.textContent = candidato.nome;
  partido.textContent = "Partido: " + candidato.partido;

  if (candidato.foto) {
    foto.src = candidato.foto;
    foto.alt = "Foto de " + candidato.nome;
    foto.hidden = false;
  }

  mensagem.textContent = "Confira os dados e aperte CONFIRMA.";
}

function votoBranco() {
  numeroDigitado = "";
  votoBrancoSelecionado = true;

  elemento("numero").textContent = "";
  elemento("nome").textContent = "VOTO EM BRANCO";
  elemento("partido").textContent = "";

  elemento("foto").hidden = true;
  elemento("foto").removeAttribute("src");

  elemento("mensagem").textContent =
    "Você selecionou voto em branco. Aperte CONFIRMA.";
}

function corrigir() {
  prepararCargo();
  elemento("mensagem").textContent =
    "Digite novamente o número do candidato.";
}

function confirmar() {
  const cargo = cargos[etapa];

  if (votoBrancoSelecionado) {
    avancarCargo("BRANCO");
    return;
  }

  if (numeroDigitado.length !== cargo.digitos) {
    elemento("mensagem").textContent =
      `Digite os ${cargo.digitos} números ou selecione BRANCO.`;
    return;
  }

  const candidato = cargo.candidatos[numeroDigitado];

  if (!candidato) {
    elemento("mensagem").textContent =
      "Número inválido. Aperte CORRIGE.";
    return;
  }

  avancarCargo(candidato.nome);
}

function avancarCargo(voto) {
  elemento("mensagem").textContent = "Voto registrado na simulação.";

 
  etapa++;

  if (etapa < cargos.length) {
    prepararCargo();
    return;
  }

  cpfsUtilizados.add(cpfAtual);

  elemento("telaUrna").hidden = true;
  elemento("telaFinal").hidden = false;

  elemento("resumoFinal").textContent =
    "Você passou pelos seis cargos da simulação. " +
    "Nenhum voto foi enviado à Justiça Eleitoral.";

  elemento("cpf").value = "";
  elemento("mensagemCPF").textContent = "";
  cpfAtual = "";
}

function voltarInicio() {
  elemento("telaFinal").hidden = true;
  elemento("telaCPF").hidden = false;
}