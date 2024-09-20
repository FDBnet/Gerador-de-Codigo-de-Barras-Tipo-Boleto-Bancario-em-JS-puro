function gerarCodBarras(opcoes) {
    'use strict';

    const padroes = {
        codg: '',
        idElemento: 'canvas-codBarra',
        altura: 50,
        margemVertical: 10,
        comTexto: true,
        fonteTexto: '12px monospace',
        corFundo: '#FFFFFF',
        corLinha: '#000000',
        debug: false
    };

    const configs = {...padroes, ...opcoes};

    if (!configs.codg) {
        console.error('Código de barras não fornecido');
        return;
    }

    const container = document.getElementById(configs.idElemento);
    if (!container) {
        console.error(`Elemento com ID "${configs.idElemento}" não encontrado`);
        return;
    }

    const canvas = document.createElement('canvas');
    container.innerHTML = '';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: false });

    // Mapa de bits para Código Interbancário (FEBRABAN)
    const bitMap = {
        0: '00110', 1: '10001', 2: '01001', 3: '11000', 4: '00101',
        5: '10100', 6: '01100', 7: '00011', 8: '10010', 9: '01010'
    };

    function desenharCodigo() {
        const larguraTotal = container.offsetWidth;
        const larguraBarra = Math.max(1, Math.floor(larguraTotal / (configs.codg.length * 11 + 2)));
        const larguraTotal1 = (configs.codg.length * 11 + 2) * larguraBarra;
        
        canvas.width = larguraTotal1;
        canvas.height = configs.altura + (configs.comTexto ? configs.margemVertical + 12 : 0);

        ctx.fillStyle = configs.corFundo;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = configs.corLinha;
        let x = larguraBarra; // Margem inicial

        for (let i = 0; i < configs.codg.length; i++) {
            const digito = configs.codg[i];
            const padrao = bitMap[digito];

            if (!padrao) {
                console.error(`Dígito inválido no código de barras: ${digito}`);
                continue;
            }

            for (let j = 0; j < 5; j++) {
                if (padrao[j] === '1') {
                    ctx.fillRect(x, 0, larguraBarra, configs.altura);
                }
                x += larguraBarra;
            }
            x += larguraBarra; // Espaço entre dígitos
        }

        if (configs.comTexto) {
            ctx.font = configs.fonteTexto;
            ctx.fillStyle = configs.corLinha;
            ctx.textAlign = 'center';
            ctx.fillText(configs.codg, canvas.width / 2, canvas.height - 5);
        }

        if (configs.debug) {
            console.log(`Largura total: ${larguraTotal1}px, Largura da barra: ${larguraBarra}px`);
        }
    }

    desenharCodigo();

    // Redesenha o código de barras quando a janela é redimensionada
    const debouncedResize = debounce(desenharCodigo, 250);
    window.addEventListener('resize', debouncedResize);

    // Função de debounce para otimizar o redimensionamento
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}
