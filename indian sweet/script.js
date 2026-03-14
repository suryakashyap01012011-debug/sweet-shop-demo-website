document.addEventListener("DOMContentLoaded", () => {
    // 1. Remove Loader
    setTimeout(() => {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 500);
    }, 1200);

    // 2. Navbar Scroll Effect & Hamburger Menu
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // 3. Page Routing (SPA behavior)
    const links = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".page-section");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Mobile close menu
            navLinks.classList.remove("show");

            // Remove active classes
            links.forEach(l => l.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active-page"));

            // Add active class to clicked link and corresponding section
            link.classList.add("active");
            const targetId = link.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active-page");

            // Scroll to top
            window.scrollTo(0, 0);

            // Re-trigger scroll animations for new section
            triggerReveals();
        });
    });

    // 4. Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal");
    
    function triggerReveals() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            // Only animate if it's within the currently active page
            if(reveal.closest('.active-page')) {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add("active");
                    // Trigger counters if inside this reveal
                    const counters = reveal.querySelectorAll('.counter');
                    if(counters.length > 0) animateCounters(counters);
                }
            }
        });
    }
    
    window.addEventListener("scroll", triggerReveals);
    // Initial trigger
    setTimeout(triggerReveals, 1300);

    // 5. Counter Animation
    let countersAnimated = false;
    function animateCounters(counters) {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200; // lower is faster
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // 6. Product Filter
    const filterBtns = document.querySelectorAll(".filter-btn");
    const products = document.querySelectorAll(".product-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Active button styling
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Filter logic
            const filterValue = btn.getAttribute("data-filter");
            
            products.forEach(product => {
                const category = product.getAttribute("data-category");
                
                if (filterValue === "all" || category.includes(filterValue)) {
                    product.style.display = "block";
                    setTimeout(() => product.style.opacity = "1", 50);
                } else {
                    product.style.opacity = "0";
                    setTimeout(() => product.style.display = "none", 300);
                }
            });
        });
    });
});