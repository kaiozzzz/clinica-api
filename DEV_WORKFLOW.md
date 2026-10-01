Clínica API — Workflow de Desenvolvimento

Este documento define como analisar e executar tarefas no projeto Clínica API.

1. Antes de alterar código

Identifique:

objetivo da tarefa;
comportamento esperado;
erro atual, se existir;
arquivos diretamente relacionados;
dependências externas envolvidas.

Não analise o projeto inteiro sem necessidade.

2. Seleção de contexto

Priorize somente os arquivos necessários.

Enviar arquivo inteiro quando:
o arquivo é pequeno;
a lógica relevante está espalhada pelo arquivo;
existem dependências internas importantes;
a alteração pode afetar várias partes do arquivo.
Enviar somente um trecho quando:
o arquivo é grande;
o problema está claramente localizado;
o restante do arquivo não influencia a decisão.

Ao enviar um trecho, incluir contexto suficiente para identificar imports, funções, tipos e variáveis envolvidos.

Enviar vários arquivos quando:
existe comunicação direta entre eles;
uma alteração em um arquivo depende da implementação de outro;
o erro atravessa camadas da arquitetura.

Evitar enviar arquivos não relacionados.

3. Investigação de erros

Quando houver erro:

Informar a mensagem completa do erro.
Informar o comando utilizado.
Informar o comportamento esperado.
Informar o comportamento atual.
Enviar somente os arquivos relacionados.
Identificar a causa antes de propor a correção.

Não assumir a causa do erro sem analisar as evidências disponíveis.

4. Alterações de código

Antes de gerar código:

Explicar brevemente o problema.
Identificar os arquivos que serão alterados.
Explicar o que será modificado.
Gerar somente o código necessário.

Evitar refatorações não relacionadas.

5. Banco de dados

Para problemas envolvendo Supabase/PostgreSQL:

não inventar tabelas;
não inventar colunas;
não assumir nomes de relacionamentos;
não assumir tipos de dados;
não alterar schema sem confirmação.

Quando o schema for necessário, solicitar somente as informações relevantes.

6. Testes

Depois de uma alteração:

Aplicar a mudança.
Executar o teste ou comando mais específico possível.
Se falhar, retornar o erro completo.
Não fazer várias alterações diferentes ao mesmo tempo sem necessidade.
7. Comunicação de resultados

Ao finalizar uma tarefa, responder de forma objetiva:

Alterações
arquivo alterado;
alteração realizada.
Validação
comando/teste executado;
resultado.
Próximo passo

Somente se existir uma ação necessária.

8. Tarefas grandes

Dividir tarefas grandes em etapas menores.

Exemplo:

entender o problema;
analisar arquivos relevantes;
definir solução;
implementar;
testar;
corrigir problemas encontrados;
revisar.

Não tentar implementar toda a tarefa grande em uma única resposta quando isso aumentar desnecessariamente o contexto ou o risco de erro.

9. Regra de contexto

Não solicitar novamente informações que já estejam disponíveis no Project.

Se faltar contexto, solicitar somente o arquivo, trecho, erro ou informação específica necessária.

Nunca solicitar o projeto inteiro quando o problema puder ser isolado.