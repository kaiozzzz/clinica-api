# Clínica API — Fluxo de Debug

Use este fluxo para investigar erros no projeto.

## 1. Definir o problema

Identificar:

* erro apresentado;
* ação que gerou o erro;
* comportamento atual;
* comportamento esperado.

Não assumir a causa antes de analisar as evidências.

## 2. Começar pelo menor contexto

Solicitar primeiro somente:

* mensagem completa do erro;
* stack trace, se existir;
* comando ou ação que gerou o erro;
* arquivo ou trecho diretamente relacionado.

Não solicitar o projeto inteiro.

## 3. Expandir o contexto somente se necessário

Se o primeiro arquivo não for suficiente:

1. identificar a dependência direta;
2. solicitar somente o próximo arquivo relevante;
3. repetir o processo até existir contexto suficiente.

Exemplo:

Controller
→ Service
→ Repository

Não solicitar as três camadas automaticamente.

## 4. Banco de dados

Se o erro envolver Supabase/PostgreSQL, solicitar somente:

* tabela;
* colunas relevantes;
* tipos;
* relacionamentos relevantes;
* erro retornado pelo banco.

Não assumir schema.

Nunca solicitar:

* `.env`;
* senha;
* API key;
* service role key;
* tokens.

## 5. APIs externas

### Evolution API

Quando necessário, analisar:

* endpoint utilizado;
* payload;
* resposta;
* código HTTP;
* mensagem de erro.

### OpenAI

Quando necessário, analisar:

* chamada utilizada;
* parâmetros relevantes;
* resposta;
* erro retornado.

Nunca solicitar API keys.

## 6. Diagnóstico

Antes de gerar uma correção:

1. identificar a causa provável;
2. explicar quais evidências sustentam essa conclusão;
3. separar fatos confirmados de hipóteses;
4. indicar os arquivos que precisam ser alterados.

Se não houver evidência suficiente, solicitar somente a informação faltante.

## 7. Correção

Gerar somente as alterações necessárias.

Não:

* refatorar partes não relacionadas;
* alterar arquitetura sem necessidade;
* modificar banco sem confirmação;
* criar abstrações desnecessárias.

## 8. Validação

Após a alteração:

1. executar o teste mais específico possível;
2. informar o comando executado;
3. analisar o resultado;
4. se falhar, continuar a investigação usando o novo erro.

## 9. Finalização

Quando o problema estiver resolvido, informar de forma objetiva:

### Causa

O que causava o problema.

### Alteração

O que foi modificado.

### Validação

Qual teste foi executado e seu resultado.

### Próximo passo

Somente se houver alguma ação necessária.
