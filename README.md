# Gerador de Código de Barras Tipo Boleto Bancário em JS puro

Este projeto implementa um gerador de código de barras para boletos bancários utilizando JavaScript puro. Ele cria uma representação visual do código de barras em um elemento canvas, sendo ideal para uso em aplicações web que necessitam gerar códigos de barras dinamicamente no lado do cliente.

## Características

- Geração de código de barras baseado no padrão FEBRABAN (Federação Brasileira de Bancos)
- Renderização em canvas para melhor desempenho e qualidade
- Responsivo, adaptando-se automaticamente ao tamanho do container
- Opção para exibir o código numérico abaixo do código de barras
- Customizável (cores, dimensões, fonte do texto)
- Modo de depuração para facilitar o desenvolvimento

## Instalação

1. Faça o download do arquivo `gerador.js`
2. Inclua o script em seu projeto HTML:

```html
<script src="caminho/para/gerador.js"></script>
```

## Uso

Para gerar um código de barras, você precisa:

1. Criar um elemento container no seu HTML
2. Chamar a função `gerarCodBarras` com as opções desejadas

Exemplo básico:

```html
<div id="container-codBarra"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    gerarCodBarras({
        codg: '12345678901234567890123456789012345678901234',
        idElemento: 'container-codBarra'
    });
});
</script>
```

## Opções

A função `gerarCodBarras` aceita um objeto de opções com os seguintes parâmetros:

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `codg` | string | '' | O código numérico a ser gerado (obrigatório) |
| `idElemento` | string | 'canvas-codBarra' | ID do elemento container |
| `altura` | number | 50 | Altura do código de barras em pixels |
| `margemVertical` | number | 10 | Margem vertical quando o texto é exibido |
| `comTexto` | boolean | true | Se deve exibir o código numérico abaixo das barras |
| `fonteTexto` | string | '12px monospace' | Estilo da fonte para o texto |
| `corFundo` | string | '#FFFFFF' | Cor de fundo do canvas |
| `corLinha` | string | '#000000' | Cor das barras e do texto |
| `debug` | boolean | false | Ativa o modo de depuração |

## Exemplo Avançado

```javascript
gerarCodBarras({
    codg: '12345678901234567890123456789012345678901234',
    idElemento: 'meu-container',
    altura: 80,
    comTexto: true,
    fonteTexto: '14px Arial',
    corFundo: '#F0F0F0',
    corLinha: '#000080',
    debug: true
});
```

## Observações

- O código se adapta automaticamente à largura do container.
- Um evento de redimensionamento é adicionado à janela para ajustar o código de barras quando o tamanho da tela muda.
- O modo de depuração (`debug: true`) exibe informações úteis no console do navegador.

## Compatibilidade

Este gerador é compatível com navegadores modernos que suportam canvas HTML5.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
