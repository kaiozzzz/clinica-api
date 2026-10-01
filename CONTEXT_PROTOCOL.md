# Clínica API — Protocolo de Contexto

Este documento define quanto contexto deve ser fornecido ao Claude em cada tarefa.

## Regra principal

Enviar o menor conjunto de informações capaz de permitir uma análise correta.

Não enviar o projeto inteiro por padrão.

## 1. Nenhum arquivo

Não enviar arquivos quando:

* a pergunta for conceitual;
* a dúvida puder ser respondida usando o contexto permanente;
* não houver necessidade de analisar implementação.

## 2. Trecho de arquivo

Preferir um trecho quando:

* o problema estiver claramente localizado;
* o arquivo for grande;
* somente uma função, classe ou bloco estiver envolvido.

O trecho deve incluir contexto suficiente para compreender:

* imports relevantes;
* tipos utilizados;
* função ou método afetado;
* variáveis relacionadas;
* chamadas para outras funções quando forem importantes.

## 3. Arquivo inteiro

Enviar o arquivo inteiro quando:

* ele for pequeno;
* várias partes do arquivo participarem do problema;
* a estrutura do arquivo for importante;
* não for possível determinar o contexto necessário através de um trecho.

## 4. Vários arquivos

Enviar vários arquivos somente quando existir uma relação direta entre eles.

Exemplos:

* Controller + Service;
* Service + Repository;
* Route + Controller;
* Service + tipo/interface utilizado.

Não enviar arquivos apenas porque pertencem ao mesmo módulo.

## 5. Erros

Sempre fornecer:

* mensagem completa do erro;
* stack trace quando existir;
* comando ou ação que gerou o erro;
* comportamento esperado;
* comportamento atual.

Logs longos devem ser reduzidos ao trecho relevante quando as partes restantes não influenciarem a investigação.

## 6. Banco de dados

Para erros relacionados ao Supabase/PostgreSQL, fornecer somente o schema necessário.

Quando possível, informar:

* tabela envolvida;
* colunas relevantes;
* tipos;
* relacionamentos relevantes;
* mensagem completa do erro.

Não enviar credenciais, chaves ou `.env`.

## 7. APIs externas

Para problemas com Evolution API ou OpenAI, fornecer somente:

* código que realiza a chamada;
* payload relevante;
* resposta ou erro;
* comportamento esperado.

Não fornecer chaves de API.

## 8. Nova conversa

Começar uma nova conversa quando:

* a tarefa anterior estiver concluída;
* o assunto mudar significativamente;
* a conversa acumular contexto que não é mais relevante;
* o histórico estiver dificultando a tarefa atual.

Ao iniciar uma nova conversa dentro do mesmo Project, utilizar o contexto permanente disponível no Project em vez de repetir informações já documentadas.

## 9. Continuar uma conversa

Continuar a conversa quando:

* a tarefa ainda estiver em andamento;
* houver correções sucessivas do mesmo problema;
* o resultado de um teste precisar ser analisado;
* o código alterado depender diretamente da discussão anterior.

## 10. Regra de economia

Antes de enviar qualquer arquivo, perguntar:

"Claude realmente precisa deste arquivo para responder corretamente?"

Se a resposta for não, não enviar.

Se houver dúvida entre enviar um arquivo inteiro ou um trecho, começar pelo trecho, desde que ele contenha contexto suficiente.
