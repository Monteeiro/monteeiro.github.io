/* Menu hambúrguer para telas pequenas (sem texto fixo, funciona em qualquer idioma:
   os rótulos vêm dos atributos data-label-open e data-label-close do botão) */

(function () {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.getElementById("menu-principal");

    if (!toggle || !menu) return;

    const desktop = window.matchMedia("(min-width: 761px)");

    function isOpen() {
        return menu.classList.contains("is-open");
    }

    function setOpen(open) {
        menu.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute(
            "aria-label",
            open ? toggle.dataset.labelClose : toggle.dataset.labelOpen
        );
    }

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    // Fecha ao escolher um item do menu
    menu.addEventListener("click", (e) => {
        if (e.target.closest("a")) setOpen(false);
    });

    // Fecha com a tecla Esc e devolve o foco ao botão
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Fecha ao clicar fora do cabeçalho
    document.addEventListener("click", (e) => {
        if (isOpen() && !e.target.closest(".site-header")) setOpen(false);
    });

    // Fecha ao girar o celular ou aumentar a janela
    desktop.addEventListener("change", (e) => {
        if (e.matches) setOpen(false);
    });
})();