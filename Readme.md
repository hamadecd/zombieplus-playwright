![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.
### Observações
Para que o projeto funcione em seu computador, é preciso ter o ambiente alvo dos testes executando, o que não é possível de deixar aqui acessível, seja a API, o ambiente Web ou a base de dados, por fazerem parte do curso da QAxperience. Pretendo desenvolver meu próprio ambiente para que eu consiga assim, compartilhar todo ele aqui no Github.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar
Pré-requisitos: Este projeto usa Yarn para gerenciar dependências. Caso ainda não tenha o Yarn instalado, instale-o executando:
```
npm install -g yarn
```

1. Clonar o repositório, instalar as dependências
```
git clone https://github.com/hamadecd/zombieplus-playwright.git
```
Mudar para o diretório zombieplus-playwright
```
cd zombieplus-playwright
```
```
yarn install
```

2. Executar testes em Headless
```
yarn playwright test 
```

3. Executar ver o relatório dos testes
```
yarn playwright show-report
```

<hr>
Curso disponível em https://qaxperience.com
