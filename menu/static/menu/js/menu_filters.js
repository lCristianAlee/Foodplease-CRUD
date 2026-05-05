(function () {
    const chips = Array.from(document.querySelectorAll("[data-category-filter]"));
    const cards = Array.from(document.querySelectorAll("[data-menu-card]"));

    if (!chips.length || !cards.length) {
        return;
    }

    const count = document.querySelector("[data-menu-count]");
    const countLabel = document.querySelector("[data-menu-count-label]");
    const emptyFilter = document.querySelector("[data-menu-empty-filter]");
    const validCategories = new Set(chips.map((chip) => chip.dataset.categoryFilter || ""));

    function categoryFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const category = params.get("categoria") || "";
        return validCategories.has(category) ? category : "";
    }

    function updateUrl(category) {
        const url = new URL(window.location.href);
        if (category) {
            url.searchParams.set("categoria", category);
        } else {
            url.searchParams.delete("categoria");
        }
        window.history.pushState({ category }, "", url);
    }

    function applyFilter(category, shouldPushUrl) {
        let visible = 0;

        cards.forEach((card) => {
            const matches = !category || card.dataset.category === category;
            card.hidden = !matches;
            if (matches) {
                visible += 1;
            }
        });

        chips.forEach((chip) => {
            const active = (chip.dataset.categoryFilter || "") === category;
            chip.classList.toggle("is-active", active);
            chip.setAttribute("aria-current", active ? "true" : "false");
        });

        if (count) {
            count.textContent = String(visible);
        }
        if (countLabel) {
            countLabel.textContent = visible === 1 ? "plato" : "platos";
        }
        if (emptyFilter) {
            emptyFilter.hidden = visible !== 0;
        }
        if (shouldPushUrl) {
            updateUrl(category);
        }
    }

    chips.forEach((chip) => {
        chip.addEventListener("click", (event) => {
            event.preventDefault();
            applyFilter(chip.dataset.categoryFilter || "", true);
        });
    });

    window.addEventListener("popstate", () => {
        applyFilter(categoryFromUrl(), false);
    });

    applyFilter(categoryFromUrl(), false);
}());
