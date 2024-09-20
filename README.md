# Gerador de Código de Barras Tipo Boleto Bancário em JS puro

Este projeto implementa um gerador de código de barras para boletos bancários utilizando JavaScript puro. Ele cria uma representação visual do código de barras em um elemento canvas, sendo ideal para uso em aplicações web que necessitam gerar códigos de barras dinamicamente no lado do cliente.

## Características

- Geração de código de barras baseado no padrão ITF (Interleaved 2 of 5) usado em boletos bancários brasileiros
- Renderização em canvas para melhor desempenho e qualidade
- Responsivo, adaptando-se automaticamente ao tamanho do container
- Opção para exibir o código numérico abaixo do código de barras
- Customizável (cores, dimensões, fonte do texto)
- Redimensionamento automático ao mudar o tamanho da janela

## Instalação

1. Faça o download do arquivo `gerador.js`
2. Inclua o script em seu projeto HTML:

```html
<script src="caminho/para/gerador-codigo-barras.js"></script>
```

## Uso

Para gerar um código de barras, você precisa:

1. Criar um elemento container no seu HTML
2. Chamar a função `gerarCodigoBarras` com as opções desejadas

Exemplo básico:

```html
<div id="container-codigo-barras"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    gerarCodigoBarras({
        codigo: '07799988500000065000001112065475690062868206',
        idElemento: 'container-codigo-barras'
    });
});
</script>
```

## Opções

A função `gerarCodigoBarras` aceita um objeto de opções com os seguintes parâmetros:

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `codigo` | string | '' | O código numérico a ser gerado (obrigatório) |
| `idElemento` | string | 'container-codigo-barras' | ID do elemento container |
| `altura` | number | 100 | Altura do código de barras em pixels |
| `tamanhoFonte` | number | 16 | Tamanho da fonte para o texto |
| `distanciaTexto` | number | 5 | Distância entre o código de barras e o texto |
| `centralizarTexto` | boolean | true | Se deve centralizar o texto abaixo do código de barras |
| `corFundo` | string | '#FFFFFF' | Cor de fundo do canvas |
| `corLinha` | string | '#000000' | Cor das barras |
| `corTexto` | string | '#000000' | Cor do texto |

## Exemplo Avançado

```javascript
gerarCodigoBarras({
    codigo: '07799988500000065000001112065475690062868206',
    idElemento: 'meu-container',
    altura: 120,
    tamanhoFonte: 18,
    distanciaTexto: 8,
    centralizarTexto: true,
    corFundo: '#F0F0F0',
    corLinha: '#000080',
    corTexto: '#800000'
});
```

## Observações

- O código se adapta automaticamente à largura do container.
- Um observador de redimensionamento é utilizado para ajustar o código de barras quando o tamanho do container muda.
- A função utiliza um mecanismo de debounce para otimizar o desempenho durante o redimensionamento.

## Compatibilidade

Este gerador é compatível com navegadores modernos que suportam canvas HTML5 e ResizeObserver.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar este projeto.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
