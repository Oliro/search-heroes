# Marvel Search Heroes

Este projeto foi desenvolvido utilizando os requisitos do Luizalabs Frontend Challenge, concebido em Angular 17 e a API da Marvel de super-heróis. Nele, você pode pesquisar por heróis, favoritar seus prediletos e ver detalhes sobre cada um dos personagens.

Você pode visualizar o projeto funcionando [aqui](https://oliro.github.io/search-heroes/).

## Requisitos do Luizalabs Frontend Challenge

### Objetivo
Desenvolver uma aplicação de listagem e detalhe de personagens de quadrinhos.

### Requisitos

- Deve ser uma SPA “single page application”;
- Não utilizar bibliotecas de UI como: bootstrap, semantic-ui, antdesign e etc;
- Utilizar API da Marvel ([Documentação da API](https://developer.marvel.com/docs));
- Disponibilizar em uma URL pública do projeto rodando para avaliação;
- Disponibilizar código em repositório Git, commitando cada fase do processo de desenvolvimento;
- Seguir layout da pasta ./assets, respeitando as páginas, features e componentes (não será avaliado “pixel perfect”).

### Requisitos funcionais

#### Página de listagem de personagens (home):

- Exibir os 20 primeiros resultados da API;
- Permitir ordenação por nome do personagem;
- Permitir filtrar por nome, pelo campo de busca;
- Permitir mostrar apenas os personagens favoritos;
- Permitir o usuário favoritar/desfavoritar até 5 personagens;

#### Página de detalhe do personagem:

- Exibir dados do personagem;
- Exibir os últimos 10 quadrinhos lançados deste personagem (onSaleDate);
- Persistir os dados de favoritos (para manter os dados após o reload da página);
- Layout responsivo;
- Utilização de ES6+;
- Teste e2e;

## Como rodar localmente a aplicação:

1. Após clonar o repositório, adquira uma chave PRIVADA da API da Marvel e autorize o domínio `oliro.github.io`. Em seguida, crie um arquivo `env-marvel.ts` no diretório `src/environments` com a sua chave privada. Exemplo:

```typescript
export class EnvMarvel {
    privateKey = 'sua chave privada aqui'
}
```
Agora basta rodar o projeto:

ng serve

Para rodar os testes e2e e unitários:

npx cypress open
