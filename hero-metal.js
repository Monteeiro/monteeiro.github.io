/* Metal líquido azul nas laterais da hero, usando o shader Liquid Metal
   da Paper Shaders (o mesmo efeito do componente "Liquid Metal Hero" do 21st.dev).
   Requer paper-shaders.js carregado antes deste arquivo.
   Cada lateral é um shader independente, então o centro fica livre para o texto. */

(function () {
    const {
        ShaderMount,
        liquidMetalFragmentShader,
        LiquidMetalShapes,
        ShaderFitOptions,
        getShaderColorFromString,
        emptyPixel
    } = window.PaperShaders || {};

    if (!ShaderMount) return;

    /* Ajustes comuns às duas laterais: mexa aqui para mudar o visual */
    const CONFIG = {
        shape: "metaballs",                 // "metaballs", "circle", "daisy" ou "diamond"
        colorBack: "rgba(255,255,255,0)",   // transparente: o fundo branco da hero aparece
        colorTint: "#2f6bff",               // tom do metal (azul)
        repetition: 2,                      // densidade das faixas de reflexo (1 a 10)
        softness: 0.1,                      // 0 = reflexo duro, 1 = degradê suave
        shiftRed: 0.3,                      // dispersão cromática (-1 a 1)
        shiftBlue: 0.3,
        distortion: 0.07,                   // ondulação das faixas
        contour: 0.4,                       // distorção nas bordas
        speed: 0.8,                         // velocidade da animação
        scale: 0.9,                         // zoom (menor = gotas menores)
        fit: "cover"                        // "cover" espalha as gotas pela altura toda
    };

    /* Cada lateral tem seu próprio ângulo e ponto de partida na animação,
       para os dois lados não ficarem idênticos */
    const SIDES = [
        { selector: ".metal-left",  angle: 70,  frame: 0,    offsetX: 0, offsetY: 0 },
        { selector: ".metal-right", angle: 250, frame: 6000, offsetX: 0, offsetY: 0 }
    ];

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // O shader precisa de uma imagem carregada, mesmo quando usa uma forma pronta
    const placeholder = new Image();
    placeholder.src = emptyPixel;

    placeholder.addEventListener("load", () => {
        SIDES.forEach((side) => {
            const container = document.querySelector(side.selector);
            if (!container) return;

            new ShaderMount(
                container,
                liquidMetalFragmentShader,
                {
                    u_colorBack: getShaderColorFromString(CONFIG.colorBack),
                    u_colorTint: getShaderColorFromString(CONFIG.colorTint),
                    u_image: placeholder,
                    u_isImage: false,
                    u_shape: LiquidMetalShapes[CONFIG.shape],
                    u_repetition: CONFIG.repetition,
                    u_softness: CONFIG.softness,
                    u_shiftRed: CONFIG.shiftRed,
                    u_shiftBlue: CONFIG.shiftBlue,
                    u_distortion: CONFIG.distortion,
                    u_contour: CONFIG.contour,
                    u_angle: side.angle,

                    u_fit: ShaderFitOptions[CONFIG.fit],
                    u_scale: CONFIG.scale,
                    u_rotation: 0,
                    u_offsetX: side.offsetX,
                    u_offsetY: side.offsetY,
                    u_originX: 0.5,
                    u_originY: 0.5,
                    u_worldWidth: 0,
                    u_worldHeight: 0
                },
                undefined,
                reduceMotion ? 0 : CONFIG.speed,   // speed 0 = quadro estático
                side.frame + (reduceMotion ? 3000 : 0),
                undefined,
                undefined,
                ["u_image"]
            );
        });
    });
})();