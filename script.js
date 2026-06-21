// ==========================
// Skills + Education Animation
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // ---------- Skills Animation ----------

    const skillsSection = document.querySelector(".skills");
    const progressBars = document.querySelectorAll(".progress");
    const counters = document.querySelectorAll(".count");

    let skillsAnimated = false;

    function animateSkills() {

        if (skillsAnimated) return;
        skillsAnimated = true;

        progressBars.forEach((bar, index) => {

            // Save the final width from CSS
            const finalWidth = getComputedStyle(bar).getPropertyValue("--progress");

            // Reset
            bar.style.width = "0";

            // Animate bar
            setTimeout(() => {
                bar.style.width = finalWidth;
            }, 200);

            // Animate percentage
            const counter = counters[index];
            const target = +counter.dataset.target;

            let count = 0;

            const updateCounter = () => {

                if (count < target) {

                    count++;
                    counter.innerText = count + "%";

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + "%";

                }

            };

            updateCounter();

        });

    }

    // ---------- Education Animation ----------

    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(60px)";
        item.style.transition = "all 0.8s ease";

    });

    function revealTimeline() {

        timelineItems.forEach((item, index) => {

            const top = item.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {

                setTimeout(() => {

                    item.style.opacity = "1";
                    item.style.transform = "translateY(0)";

                }, index * 200);

            }

        });

    }

    // ---------- Scroll Observer ----------

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateSkills();

            }

        });

    }, {
        threshold: 0.4
    });

    observer.observe(skillsSection);

    window.addEventListener("scroll", revealTimeline);

    revealTimeline();

});