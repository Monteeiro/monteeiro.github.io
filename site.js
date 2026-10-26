/* Comportamentos do site (sem texto fixo, funciona em qualquer idioma) */

(function () {
    initFooterYear();
    initActiveNav();
    initCardGlow();
    initBackToTop();

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
})();