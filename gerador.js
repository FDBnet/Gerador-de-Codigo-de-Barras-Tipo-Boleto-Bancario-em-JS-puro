class CodigoBarrasITF {
    constructor(codigo) {
        this.codigo = codigo.replace(/\D/g, '');
        if (this.codigo.length % 2 !== 0) {
            this.codigo = '0' + this.codigo;
        }
        this.padroes = {
            inicio: '1010',
            fim: '11101',
            codigos: [
                '00110', '10001', '01001', '11000', '00101',
                '10100', '01100', '00011', '10010', '01010'
            ]
        };
        this.codificado = this.codificar(); // Pré-codifica para otimização
    }

    codificar() {
        let codificado = this.padroes.inicio;
        for (let i = 0; i < this.codigo.length; i += 2) {
            const a = parseInt(this.codigo[i]);
            const b = parseInt(this.codigo[i + 1]);
            for (let j = 0; j < 5; j++) {
                codificado += this.padroes.codigos[a][j] === '1' ? '11' : '1';
                codificado += this.padroes.codigos[b][j] === '1' ? '00' : '0';
            }
        }
        return codificado + this.padroes.fim;
    }

    renderizar(canvas, opcoes = {}) {
        const padroesRenderizacao = {
            altura: 100,
            tamanhoFonte: 16,
            distanciaTexto: 5,
            centralizarTexto: true,
            corFundo: '#FFFFFF',
            corLinha: '#000000',
            corTexto: '#000000'
        };
        const config = { ...padroesRenderizacao, ...opcoes };

        const ctx = canvas.getContext('2d');
        const larguraCanvas = canvas.width;
        const larguraBarra = larguraCanvas / this.codificado.length;

        canvas.height = config.altura + config.tamanhoFonte + config.distanciaTexto;

        // Fundo
        ctx.fillStyle = config.corFundo;
        ctx.fillRect(0, 0, larguraCanvas, canvas.height);

        // Código de Barras
        ctx.fillStyle = config.corLinha;
        for (let i = 0; i < this.codificado.length; i++) {
            if (this.codificado[i] === '1') {
                ctx.fillRect(i * larguraBarra, 0, larguraBarra, config.altura);
            }
        }

        // Texto
        if (config.centralizarTexto) {
            ctx.font = `${config.tamanhoFonte}px Arial`;
            ctx.fillStyle = config.corTexto;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(this.codigo, larguraCanvas / 2, config.altura + config.distanciaTexto);
        }
    }
}

function gerarCodigoBarras(opcoes) {
    const padroesGeracao = {
        codigo: '',
        idElemento: 'container-codigo-barras',
        altura: 100,
        tamanhoFonte: 16,
        distanciaTexto: 5,
        centralizarTexto: true
    };

    const configs = { ...padroesGeracao, ...opcoes };
    const container = document.getElementById(configs.idElemento);
    if (!container) {
        console.error(`Elemento com ID "${configs.idElemento}" não encontrado`);
        return;
    }

    const canvas = document.createElement('canvas');
    container.innerHTML = '';
    container.appendChild(canvas);

    const codigoBarras = new CodigoBarrasITF(configs.codigo);

    function renderizarCodigoBarras() {
        canvas.width = container.clientWidth;
        codigoBarras.renderizar(canvas, {
            altura: configs.altura,
            tamanhoFonte: configs.tamanhoFonte,
            distanciaTexto: configs.distanciaTexto,
            centralizarTexto: configs.centralizarTexto
        });
    }

    // Renderiza inicialmente
    renderizarCodigoBarras();

    // Configura o redimensionamento responsivo
    const observadorRedimensionamento = new ResizeObserver(limitarExecucao(renderizarCodigoBarras, 250));
    observadorRedimensionamento.observe(container);

    // Função para limitar a frequência de execução
    function limitarExecucao(func, espera) {
        let timeout;
        return function funcaoExecutada(...args) {
            const depois = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(depois, espera);
        };
    }
}
