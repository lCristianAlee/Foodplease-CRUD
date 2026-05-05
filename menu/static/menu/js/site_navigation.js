(function () {
    function samePath(url) {
        return url.origin === window.location.origin && url.pathname === window.location.pathname;
    }

    function scrollToTarget(target) {
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({
            top: Math.max(top, 0),
            behavior: "smooth",
        });
    }

    document.querySelectorAll('a[href*="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const url = new URL(link.href);
            const target = document.querySelector(url.hash);

            if (!url.hash || !target || !samePath(url)) {
                return;
            }

            event.preventDefault();
            history.pushState(null, "", url.hash);
            scrollToTarget(target);
        });
    });
}());
