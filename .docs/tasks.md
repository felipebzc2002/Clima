# Plano de implementação — Aplicativo de Clima

Este arquivo organiza a implementação do PRD descrito em [prd.md](prd.md) em fases sequenciais, com tarefas pequenas, progressivas e verificáveis. Cada fase deve ser concluída e aprovada antes de avançar para a próxima.

## Convenção

- Cada tarefa está representada por uma checkbox `[]`.
- Após a implementação, a caixa deve ser marcada como `[x]`.
- Os critérios de aprovação descrevem como validar se a tarefa foi concluída corretamente.
- As tarefas foram pensadas para serem executadas uma por vez por agentes de IA.

---

## Fase 1 — Fundação do projeto

- [x] Configurar a estrutura inicial do projeto com Vite + TypeScript + HTML/CSS básico.
  - Critério de aprovação: o projeto abre localmente sem erros de configuração e a estrutura inicial está presente em arquivos como `index.html`, `src/main.ts`, `src/style.css` e `package.json`.

- [x] Criar a estrutura de pastas para a aplicação, incluindo diretório para a lógica de integração e utilidades.
  - Critério de aprovação: existem pastas ou arquivos separados para UI, integração com API e utilidades, com organização clara.

---

## Fase 2 — Arquitetura e modelo de dados

- [ ] Definir a arquitetura mínima da aplicação, separando responsabilidades entre UI, integração e utilidades.
  - Critério de aprovação: o código inicial já organiza a lógica em módulos ou arquivos distintos, sem misturar responsabilidades em um único arquivo.

- [ ] Criar um modelo de dados interno para representar as informações do clima.
  - Critério de aprovação: existe um tipo ou interface que descreve os dados principais do clima a serem exibidos na interface.

---

## Fase 3 — Integração com a API Open-Meteo

- [ ] Criar um módulo dedicado para buscar a cidade a partir do nome informado.
  - Critério de aprovação: a função realiza a requisição para o endpoint de geocodificação e retorna os dados esperados de cidade, latitude e longitude quando a resposta é válida.

- [ ] Criar um módulo dedicado para buscar o clima com base em latitude e longitude.
  - Critério de aprovação: a função realiza a requisição para o endpoint de clima e retorna os dados necessários para a tela.

- [ ] Implementar validações nas funções de integração para garantir que os parâmetros necessários sejam informados.
  - Critério de aprovação: as funções rejeitam entradas inválidas ou ausentes de forma previsível e sem quebrar a aplicação.

- [ ] Tratar respostas inválidas, vazias ou incompletas das APIs.
  - Critério de aprovação: a aplicação recebe um resultado de erro ou ausência de dados de forma controlada e sem falhas inesperadas.

---

## Fase 4 — Interface inicial

- [ ] Criar o layout base com fundo escuro e container central branco arredondado.
  - Critério de aprovação: a tela possui o layout geral conforme descrito no PRD, com container centralizado e aparência visual consistente.

- [ ] Criar a área superior com o campo de busca da cidade.
  - Critério de aprovação: existe um campo de texto e um botão ou ação para iniciar a busca, centralizados na parte superior da tela.

- [ ] Criar a sidebar esquerda para exibir informações principais do clima.
  - Critério de aprovação: a sidebar mostra, no mínimo, temperatura, dia atual, indicação de dia/noite e descrição do clima.

- [ ] Criar a área principal para exibir os demais dados meteorológicos.
  - Critério de aprovação: a área principal mostra, no mínimo, umidade, sensação térmica, vento e precipitação.

---

## Fase 5 — Estados de interface

- [ ] Implementar o empty state inicial antes da primeira busca.
  - Critério de aprovação: ao abrir a aplicação pela primeira vez, a interface exibe uma mensagem clara orientando o usuário a pesquisar uma cidade.

- [ ] Implementar o estado de carregamento durante a busca.
  - Critério de aprovação: ao iniciar uma pesquisa, a interface exibe feedback visual de carregamento e impede ações duplicadas de forma simples.

- [ ] Implementar o estado de erro ou não encontrado quando a cidade não existir ou a consulta falhar.
  - Critério de aprovação: em caso de falha, a interface mostra uma mensagem amigável e mantém o layout estável.

---

## Fase 6 — Transformação e apresentação dos dados

- [ ] Transformar os dados brutos da API em um formato interno de uso da interface.
  - Critério de aprovação: existe uma etapa de conversão dos dados recebidos em um modelo simples e reutilizável pela tela.

- [ ] Implementar a interpretação do weather code para descrição textual em português.
  - Critério de aprovação: códigos conhecidos são convertidos em descrições legíveis, como “céu limpo”, “chuva” ou “tempestade”.

- [ ] Interpretar o valor de `is_day` para mostrar se é dia ou noite.
  - Critério de aprovação: a interface exibe corretamente “Dia” ou “Noite” de acordo com o valor recebido.

---

## Fase 7 — Fluxo completo de busca

- [ ] Conectar a interface ao fluxo de busca completo: buscar cidade, depois clima e exibir os resultados.
  - Critério de aprovação: ao enviar uma busca válida, a aplicação realiza as duas etapas e mostra os dados correspondentes na interface.

- [ ] Garantir que o fluxo pareça uma única ação para o usuário, com carregamento durante a execução.
  - Critério de aprovação: o usuário vê um único processo de pesquisa com feedback consistente, sem quebra de experiência.

---

## Fase 8 — Ajustes finais e validação

- [ ] Revisar a experiência visual para garantir alinhamento com o PRD.
  - Critério de aprovação: o layout, espaçamento, contraste e organização visual estão coerentes com a proposta descrita em [prd.md](prd.md).

- [ ] Validar os principais cenários de uso: sucesso, cidade não encontrada e erro de rede.
  - Critério de aprovação: os cenários principais foram testados manualmente ou por verificação funcional e funcionam sem quebrar a interface.

- [ ] Documentar quaisquer decisões técnicas pendentes ou melhorias futuras.
  - Critério de aprovação: há um registro claro de pendências, se existirem, sem comprometer a execução atual.
