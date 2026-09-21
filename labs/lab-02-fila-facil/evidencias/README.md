# Registro das evidências

Guarde o resumo inicial e final dos 24 testes, capturas da aplicação, arquivos alterados
e uma explicação da intervenção humana. Informe ferramenta/modelo, etapa e resultado
real. Não confunda testes do Lab 01 com testes deste laboratório. Nunca registre segredos.


## 1 - PASSO

prompt:
    `Vamos trabalhar somente no Lab 02 Fila Fácil. Leia AGENTS.md da raiz, labs/lab-02-fila-facil/AGENTS.md, a especificação completa e src/fila.js desse lab. Ainda não edite arquivos. Resuma o contrato, identifique as três funções pendentes e proponha três incrementos. Explique como verificar cada um e quais arquivos você não pode alterar.`

output:
    `Resumo do Lab 02 — Fila Fácil

    Contrato
    O objeto global FilaFacil expõe 5 funções. Duas já estão implementadas (criarEstado, formatarSenha). Três estão pendentes com throw Error("LAB02_PENDENTE").
    Estado: {proximaSenha: 1, aguardando: [], atual: null, totalChamadas: 0}

    Três funções pendentes
    Função	RF	Comportamento esperado
    emitirSenha(estado)	RF-02	Adiciona proximaSenha ao fim de aguardando, incrementa proximaSenha, retorna o número emitido
    chamarProxima(estado)	RF-03/RF-04	Se houver espera: remove primeiro, define atual, incrementa totalChamadas, retorna senha. Se vazia: retorna null sem alterar nada
    reiniciarFila(estado)	RF-05	Restaura os 4 campos aos valores iniciais no mesmo objeto

    Três incrementos propostos
    1. emitirSenha — Implementar emissão sequencial e retorno do número
    2. chamarProxima — Implementar atendimento FIFO + proteção contra fila vazia
    3. reiniciarFila — Implementar reinício dos campos no mesmo objeto

    Verificação de cada incremento

    # Após cada incremento, rodar a suíte de testes:
    node labs/lab-02-fila-facil/tests/executar.mjs
    - emitirSenha: testes RF-02 devem passar (sequência, unicidade, retorno)
    - chamarProxima: testes RF-03/RF-04 devem passar (FIFO, preservação com fila vazia)
    - reiniciarFila: testes RF-05 devem passar (restauração dos 4 campos)

    Arquivos que NÃO posso alterar
    - tests/* (suíte de testes)
    - ESPECIFICACAO.md
    - index.html, src/app.js, src/estilo.css (interface fornecida)
    - Qualquer coisa do Lab 01 ou dependências externas`

verificacao:
    6 aprovados · 18 falhas · 24 testes



## 2 - PASSO

prompt:
    `Implemente somente o corpo de emitirSenha em labs/lab-02-fila-facil/src/fila.js, conforme RF-02. Preserve o restante do arquivo, a interface e os testes. Não implemente as outras duas funções agora`

output:
``

verificacao:
    10 aprovados · 14 falhas · 24 testes



## 3 - PASSO

prompt:
    `Agora implemente somente chamarProxima em labs/lab-02-fila-facil/src/fila.js. Cumpra RF-03 e RF-04: atender FIFO, retirar da espera, atualizar a senha atual e contar chamadas efetivas. Fila vazia retorna null e preserva todo o estado`

output:
``

verificacao:
    20 aprovados · 4 falhas · 24 testes


## 4 - PASSO

prompt:
    `Implemente somente reiniciarFila em labs/lab-02-fila-facil/src/fila.js, conforme RF-05. Restaure os quatro campos no mesmo objeto recebido. A confirmação já é feita pela interface — não coloque confirm(), HTML ou eventos nesta função`

output:
``

verificacao:
    24 aprovados · 0 falhas · 24 testes


## 5 - PASSO NOVAS FUNCIONALIDADES

Funcionalidade 1: Contador Visual Separado no Painel
Funcionalidade 2: Botão e Canal de Senha Prioritária (Idosos / Gestantes)

prompt:
    
    `Preciso atualizar o labs/lab-02-fila-facil/src/fila.js para incluir suporte a fila prioritária, mas sem quebrar nada do que já tá funcionando (os 24 testes existentes precisam continuar passando).
    O que precisa mudar:
    emitirSenha(estado, categoria = 'comum'): se vier sem categoria ou como 'comum', mantém o comportamento padrão jogando em estado.aguardando. Se for 'prioritaria', joga em estado.prioritarias.
    chamarProxima(estado): implementar a regra de alternância 2:1. Se tiver gente nas duas filas, atende no máximo 2 prioritárias seguidas e puxa 1 comum. Se só tiver uma das categorias na espera, atende ela direto. Toda vez que chamar uma comum (ou reiniciar), zera o contador de prioritárias consecutivas. Se não tiver ninguém pra chamar, continua retornando null.
    reiniciarFila(estado): limpa também estado.prioritarias e reseta o contador de prioritárias consecutivas.
    Por favor, não altere as assinaturas das funções nem mexa nos arquivos dentro de tests/`


prompt:

    `Agora vamos ajustar o visual em labs/lab-02-fila-facil/index.html e src/estilo.css para encaixar essa opção de prioritária:
    No card de emissão (index.html), coloca um novo botão logo abaixo do que já existe com o id btn-emitir-prioritaria e texto "Retirar prioritária (Idosos / PCD)".
    Na parte de "Na espera", inclui um contador separado pra sabermos quantas prioritárias e quantas comuns estão na fila (pode usar algo como <span id="contador-prioritarias">0 prioritárias</span>).
    No estilo.css, dá um tapa visual nesse botão secundário e garante um :focus-visible bem nítido (outline/box-shadow) pra acessibilidade de teclado.
    Mantém o layout base sem quebrar o que já tá estilizado`


prompt:

    `vamos amarrar tudo no labs/lab-02-fila-facil/src/app.js:
    Adiciona o listener de clique no #btn-emitir-prioritaria chamando FilaFacil.emitirSenha(estado, 'prioritaria') e disparando o render da tela em seguida.
    Na função de renderização, atualiza os novos spans/contadores pra refletir em tempo real a quantidade de comuns e prioritárias aguardando.
    Não precisa mexer na confirmação de reinício e nem tocar na pasta tests/`