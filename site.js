/* Comportamentos do site (sem texto fixo, funciona em qualquer idioma) */

(function () {
    initFooterYear();
    initActiveNav();
    initCardGlow();
    initBackToTop();
    initLangSwitch();

    /* Ano do rodapé sempre atual */
    function initFooterYear() {
        const year = document.getElementById("ano");
        if (year) year.textContent = new Date().getFullYear();
    }

    /* Destaque no menu da seção em que a pessoa está */
    function initActiveNav() {
        const sections = Array.from(document.querySelectorAll("main section[id]"));
        const links = new Map(
            Array.from(document.querySelectorAll("nav a[href^='#']")).map((a) => [
                a.getAttribute("href").slice(1),
                a
            ])
        );

        if (!sections.length || !links.size) return;

        const OFFSET = 120; // um pouco mais que a altura do cabeçalho fixo
        let ticking = false;

        function updateActiveLink() {
            let current = null;

            // A seção atual é a última cujo topo já passou da linha do cabeçalho
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= OFFSET) {
                    current = section.id;
                }
            }

            // No fim da página, a última seção (Contato) é curta demais para chegar
            // até a linha, então ela é ativada à força
            const atBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4;

            if (atBottom) current = sections[sections.length - 1].id;

            links.forEach((link, id) => {
                const active = id === current;
                link.classList.toggle("is-active", active);

                if (active) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });

            ticking = false;
        }

        function requestUpdate() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(updateActiveLink);
        }

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        updateActiveLink();
    }

        /* Brilho dos cards que acompanha o cursor */
        function initCardGlow() {
            const cards = document.querySelectorAll(
                ".skill-card, .project-card, .entry, .resume-box"
            );

            cards.forEach((card) => {
                card.addEventListener("pointermove", (e) => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
                });
            });
        }

        /* Botão de voltar ao topo: aparece depois de 400 px de rolagem */
        function initBackToTop() {
            const button = document.querySelector(".back-to-top");
            if (!button) return;

            function update() {
                button.classList.toggle("is-visible", window.scrollY > 400);
            }

            window.addEventListener("scroll", update, { passive: true });
            update();
        }

        /* Ao trocar de idioma, abre a outra página na mesma seção e na mesma altura */
        function initLangSwitch() {
            const KEY = "lang-scroll";
            const OFFSET = 120; // mesma linha de referência do menu ativo

            // Correspondência entre os IDs das seções de cada idioma
            const PT_TO_EN = { inicio:"home", sobre:"about", habilidades:"skills",
                projetos:"projects", experiencia:"experience", formacao:"education", contato:"contact" };
            const EN_TO_PT = { home:"inicio", about:"sobre", skills:"habilidades",
                projects:"projetos", experience:"experiencia", education:"formacao", contact:"contato" };

            const sections = Array.from(document.querySelectorAll("main section[id]"));
            const links = document.querySelectorAll(".lang-switch a");
            if (!sections.length) return;

            const map = document.documentElement.lang.startsWith("pt") ? PT_TO_EN : EN_TO_PT;

            restore();

            links.forEach((link) => {
                link.addEventListener("click", () => {
                    // Clicar na bandeira do idioma atual não precisa guardar nada
                    if (link.getAttribute("aria-current") === "true") return;
                    save();
                });
            });

            function save() {
                const atBottom =
                    window.innerHeight + window.scrollY >=
                    document.documentElement.scrollHeight - 4;

                let current = sections[0];
                for (const section of sections) {
                    if (section.getBoundingClientRect().top <= OFFSET) current = section;
                }
                if (atBottom) current = sections[sections.length - 1];

                const target = map[current.id];
                if (!target) return;

                // Em "projetos" não há equivalente exato, então abre no topo da seção de destino
                const depth =
                    current.id === "projetos"
                        ? 0
                        : Math.max(0, OFFSET - current.getBoundingClientRect().top);

                try {
                    sessionStorage.setItem(
                        KEY,
                        JSON.stringify({ target, depth, bottom: atBottom, time: Date.now() })
                    );
                } catch (e) {}
            }

            function restore() {
                let data = null;

                try {
                    data = JSON.parse(sessionStorage.getItem(KEY));
                    sessionStorage.removeItem(KEY);
                } catch (e) {
                    return;
                }

                // Ignora dados antigos (por exemplo, de um clique que foi cancelado)
                if (!data || Date.now() - data.time > 10000) return;

                function apply() {
                    if (data.bottom) {
                        window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: "instant"
                        });
                        return;
                    }

                    const section = document.getElementById(data.target);
                    if (!section) return;

                    const depth = Math.min(data.depth, section.offsetHeight);
                    const top = section.getBoundingClientRect().top + window.scrollY + depth - OFFSET;
                    window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
                }

                apply();
                // Repete depois do carregamento completo, quando fontes e imagens podem mudar a altura
                window.addEventListener("load", apply, { once: true });
            }
        }

})();