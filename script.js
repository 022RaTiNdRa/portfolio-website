(() => {
    // THEME TOGGLE
    const toggleButton = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        toggleButton.textContent = savedTheme === "dark" ? "☀️" : "🌙";
    }

    toggleButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            toggleButton.textContent = "🌙";
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            toggleButton.textContent = "☀️";
        }
    });

    // SCROLL REVEAL
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    reveals.forEach((section) => observer.observe(section));

    // CONTACT FORM
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        alert("Message sent! (Demo only)");
        form.reset();
    });
})();
