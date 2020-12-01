# Guia de utilização e configuração

1. No arquivo index.js, existe um comando de listen, com um valor que se refere à porta desejada. Caso deseje trocar a porta, basta trocar o valor.

2. Executar o comando 'npm run dev', comando customizado feito no arquivo package.json.

3. Ao executar, você deverá ver as duas mensagens de log, tanto a de porta quanto de conexão.

4. Para exportar a sua porta local, caso deseje, precisa rodar o ngrok também. Além da janela com a conexão ao banco, abra uma janela e digite 'ngrok http `porta`'. Deverá aparecer dois links, use o primeiro na URI do arquivo './api/goHomeApi.js como baseURL.

5. Caso não possua conta no ngrok, você terá que reiniciar o ngrok a cada 8 horas. A conta é gratuita, basta criar e pegar o authtoken e, antes de iniciar o ngrok, digitar: 'ngrok authtoken `authtoken`'.

6. No arquivo index.js da API, consta a string de conexão ao banco da aplicação. Caso deseje alterar para um banco local ou algo do tipo, basta alterar a string do mongoUri.
