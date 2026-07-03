# PRD — Aplicativo de Clima

## 1. Visão geral

Este projeto consiste em uma aplicação web simples e moderna para consultar o clima atual de uma cidade informada pelo usuário. A experiência deve ser rápida, intuitiva e visualmente limpa, com foco em apresentar informações essenciais como temperatura, umidade, sensação térmica, vento, precipitação e descrição do clima.

A aplicação será construída com Vite, TypeScript e JavaScript vanilla, sem framework frontend, e integrará a API Open-Meteo para buscar coordenadas geográficas a partir do nome da cidade e, em seguida, recuperar as condições climáticas da localização.

---

## 2. Objetivo do produto

Permitir que um usuário consulte de forma simples o clima atual de qualquer cidade informada, recebendo uma resposta clara com:

- temperatura atual;
- umidade relativa do ar;
- sensação térmica;
- estado do dia (dia ou noite);
- velocidade e direção do vento;
- probabilidade de precipitação;
- descrição textual do clima com base no weather code.

---

## 3. Público-alvo

Usuários que desejam:

- verificar rapidamente as condições climáticas de uma cidade;
- usar uma interface simples e objetiva;
- obter informações essenciais sem necessidade de criar conta ou autenticação.

---

## 4. Escopo do produto

### 4.1 Funcionalidades inclusas

- Campo de busca para inserir o nome de uma cidade;
- Busca do clima após envio do formulário;
- Exibição de estado de carregamento durante a consulta;
- Exibição de estado vazio quando não houver resultado;
- Exibição das principais informações meteorológicas em layout estruturado;
- Interpretação do weather code para exibir uma descrição legível.

### 4.2 Funcionalidades não inclusas

- Histórico de buscas;
- Previsão de vários dias;
- Autenticação de usuário;
- Persistência de dados locais;
- Múltiplos idiomas além do português.

---

## 5. Requisitos funcionais

### 5.1 Busca de cidade

1. O usuário deve informar o nome de uma cidade em um campo de texto.
2. O sistema deve validar se o campo foi preenchido.
3. Ao enviar a busca, o sistema deve iniciar uma consulta para localizar a cidade.
4. Se a cidade não for encontrada, o sistema deve exibir um estado vazio ou uma mensagem de não encontrado.
5. Se a cidade for encontrada, o sistema deve continuar para o passo de consulta do clima.

### 5.2 Consulta do clima

1. O sistema deve utilizar as coordenadas geográficas da cidade para consultar as condições climáticas.
2. O sistema deve recuperar as informações meteorológicas atuais necessárias.
3. Se a consulta climática falhar ou retornar dados inválidos, a aplicação deve tratar isso como ausência de resultado.

### 5.3 Exibição de dados

1. O sistema deve exibir ao menos as seguintes informações:
   - temperatura;
   - umidade relativa;
   - sensação térmica;
   - se é dia ou noite;
   - vento;
   - probabilidade de precipitação;
   - weather code e descrição interpretada.
2. A interface deve apresentar os dados de forma organizada, com destaque para os valores principais.

### 5.4 Estados de interface

1. O sistema deve exibir um estado inicial vazio antes da primeira pesquisa.
2. O sistema deve exibir um estado de carregamento durante a execução da consulta.
3. O sistema deve exibir uma mensagem amigável quando nada for encontrado.
4. O sistema deve manter um layout estável mesmo em caso de erro.

---

## 6. Requisitos de sistema

### 6.1 Requisitos de frontend

- Aplicação em Vite;
- Linguagem TypeScript;
- HTML, CSS e JavaScript vanilla;
- Estrutura modular para separar responsabilidades.

### 6.2 Requisitos de integração

- A aplicação não deve chamar a API diretamente no fluxo principal da interface;
- Deve existir um arquivo ou módulo dedicado para encapsular as funções de integração com o Open-Meteo;
- As funções devem validar os parâmetros recebidos antes de realizar requisições.

### 6.3 Requisitos de comportamento

- A busca deve envolver duas etapas sequenciais:
  1. localizar a cidade;
  2. buscar o clima com base nas coordenadas.
- Para o usuário, isso deve parecer uma única ação com feedback de carregamento.

---

## 7. Requisitos não funcionais

### 7.1 Usabilidade

- A interface deve ser simples, limpa e intuitiva.
- O fluxo de busca deve ser compreensível em poucos segundos.

### 7.2 Performance

- As consultas devem ser executadas de forma assíncrona;
- A interface deve responder rapidamente ao usuário durante o carregamento.

### 7.3 Confiabilidade

- O sistema deve tratar erros de rede, resposta vazia ou dados incompletos sem quebrar a interface.
- O comportamento em caso de falha deve ser previsível e amigável.

### 7.4 Manutenibilidade

- O código deve ser organizado por responsabilidade;
- Trechos de transformação de dados, mapeamento de weather code e integração com API devem estar isolados em módulos claros.

### 7.5 Acessibilidade

- O formulário deve ser navegável por teclado;
- Os campos e estados de carga/erro devem ser compreensíveis;
- O contraste visual deve favorecer legibilidade.

---

## 8. Fluxo de uso

1. O usuário abre a aplicação.
2. Visualiza a área superior centralizada com o campo de busca.
3. Digita o nome de uma cidade e envia a busca.
4. O sistema exibe um indicador de carregamento.
5. O sistema realiza a busca da cidade e, em seguida, consulta o clima.
6. Se a busca for bem-sucedida, exibe os dados na interface.
7. Se a busca falhar, exibe um estado vazio ou mensagem de erro amigável.

---

## 9. Regras de negócio

- A busca deve ser iniciada apenas quando houver texto válido no campo de busca.
- A aplicação deve considerar que uma consulta pode falhar em qualquer uma das duas etapas.
- A aplicação deve tratar o resultado como “sem dados” quando não houver cidade ou clima encontrado.
- O weather code deve ser traduzido para uma descrição legível em português.
- O valor de “is_day” deve ser interpretado para mostrar se a situação atual é de dia ou de noite.

---

## 10. Detalhes técnicos

### 10.1 Fontes de dados

A aplicação usará duas chamadas à API Open-Meteo:

1. Geocodificação
   - Endpoint: /v1/search
   - Objetivo: obter latitude, longitude e timezone com base no nome da cidade.
   - Campos esperados: name, latitude, longitude, timezone.

2. Previsão atual
   - Endpoint: /v1/forecast
   - Objetivo: obter as informações climáticas atuais com base na latitude e longitude.
   - Campos esperados: temperature_2m, relative_humidity_2m, apparent_temperature, is_day, wind_speed_10m, wind_direction_10m, precipitation_probability, weather_code.

### 10.2 Estrutura esperada de módulos

A implementação deve ser organizada em pelo menos dois níveis de responsabilidade:

- módulo de integração com a API Open-Meteo;
- módulo de UI e manipulação do DOM;
- módulo de utilidades para formatação, validação e mapeamento de dados.

### 10.3 Tratamento de resposta

O fluxo de integração deve:

- validar se os parâmetros foram informados corretamente;
- verificar se a resposta contém os dados esperados;
- retornar dados estruturados ou um valor de falha explícito;
- evitar que a interface quebre em caso de resposta incompleta.

### 10.4 Formato de dados esperado

A aplicação deve trabalhar com um modelo interno simples, por exemplo:

- cidade;
- temperatura;
- umidade;
- sensação térmica;
- condição climática;
- vento;
- precipitação;
- período do dia;
- data/hora da atualização.

---

## 11. Diretrizes visuais e de experiência

### 11.1 Layout geral

- Fundo escuro na página;
- Um container centralizado com borda levemente arredondada e de cor branca;
- Largura máxima aproximada de 800px;
- Visual limpo, moderno e com contraste adequado.

### 11.2 Área superior

- A parte superior deve concentrar apenas o campo de busca da cidade;
- O campo deve estar centralizado horizontalmente;
- A área superior não deve ter background visual forte, mantendo simplicidade.

### 11.3 Sidebar esquerda

A sidebar esquerda deve exibir informações principais, como:

- temperatura;
- dia atual;
- indicação de dia ou noite;
- weather code e descrição interpretada.

### 11.4 Área principal

A área principal deve exibir os demais dados climáticos, organizados de forma clara, como:

- umidade;
- sensação térmica;
- vento;
- precipitação;
- probabilidade de chuva.

### 11.5 Empty state

Antes da primeira busca, a interface deve exibir um estado vazio com uma mensagem orientando o usuário a pesquisar uma cidade.

### 11.6 Estado de carregamento

Durante a busca, deve haver feedback visual claro de que a consulta está em andamento, por exemplo com um texto de carregamento ou indicador simples.

### 11.7 Interpretação do weather code

Os códigos devem ser convertidos em descrições textuais legíveis. A interpretação deve seguir a escala informada no briefing, por exemplo:

- 0: céu limpo;
- 1, 2, 3: parcialmente nublado ou encoberto;
- 45, 48: neblina;
- 51, 53, 55: garoa;
- 61, 63, 65: chuva;
- 71, 73, 75: neve;
- 80, 81, 82: pancadas de chuva;
- 95, 96, 99: tempestade.

---

## 12. Critérios de aceitação

1. O usuário consegue pesquisar uma cidade pelo nome e visualizar o clima atual.
2. A interface mostra um estado vazio antes da primeira busca.
3. A interface mostra estado de carregamento durante a busca.
4. Quando a cidade não é encontrada, o sistema exibe uma resposta apropriada sem quebrar a tela.
5. As principais informações meteorológicas aparecem de forma clara e organizada.
6. O weather code é interpretado em linguagem simples para o usuário.

---

## 13. Decisões assumidas

- A aplicação será uma versão inicial, sem autenticação e sem persistência.
- A exibição da data e do horário será feita de forma simples, sem necessidade de regras complexas de fuso horário além do fornecido pela API.
- O visual seguirá a proposta do briefing, com foco em uma interface escura e um container central claro.
- A experiência será pensada para uso em desktop e telas médias, sem necessidade de responsividade avançada no primeiro ciclo.
