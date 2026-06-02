const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const chatToggle = document.getElementById("chat-toggle");
const chatPanel = document.getElementById("chat-panel");
const particleLayer = document.getElementById("particle-layer");
const revealEls = document.querySelectorAll(".reveal");
const testimonialTrack = document.getElementById("testimonial-track");
const teamCarousel = document.getElementById("team-carousel");
const teamTrack = document.getElementById("team-track");
const teamPrev = document.getElementById("team-prev");
const teamNext = document.getElementById("team-next");
const introOverlay = document.getElementById("intro-overlay");
const siteShell = document.getElementById("site-shell");
const stickyCta = document.getElementById("sticky-cta");
const exitModal = document.getElementById("exit-modal");
const exitClose = document.getElementById("exit-close");

function setHeaderState() {
    if (!header) {
        return;
    }
    header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function toggleMobileMenu() {
    if (!menuToggle || !mobileMenu) {
        return;
    }
    const isOpen = menuToggle.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
}

function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) {
        return;
    }
    menuToggle.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
}

function createParticles(count = 40) {
    if (!particleLayer) {
        return;
    }
    for (let i = 0; i < count; i += 1) {
        const dot = document.createElement("span");
        dot.className = "particle";
        const size = (Math.random() * 3 + 1.2).toFixed(2);
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.opacity = (Math.random() * 0.75 + 0.2).toFixed(2);
        particleLayer.appendChild(dot);

        gsap.to(dot, {
            y: `${(Math.random() - 0.5) * 120}`,
            x: `${(Math.random() - 0.5) * 80}`,
            duration: Math.random() * 6 + 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    }
}

function initRevealAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    revealEls.forEach((el, index) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: index % 3 === 0 ? 0.08 : 0,
            scrollTrigger: {
                trigger: el,
                start: "top 84%"
            }
        });
    });
}

function initHeroAnimation() {
    const heroGlow1 = document.querySelector(".hero-glow-1");
    const heroGlow2 = document.querySelector(".hero-glow-2");

    gsap.from(".hero-title", {
        y: 32,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    });

    gsap.from(".hero p, .hero .btn-primary, .hero .btn-secondary", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
    });

    if (heroGlow1) {
        gsap.to(heroGlow1, {
            y: -16,
            x: 12,
            duration: 4.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    if (heroGlow2) {
        gsap.to(heroGlow2, {
            y: 22,
            x: -10,
            duration: 4.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    gsap.to(".bolt", {
        textShadow: "0 0 24px rgba(57,163,255,1)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

function initHeroParallax() {
    const hero = document.querySelector(".hero");
    const heroGlow1 = document.querySelector(".hero-glow-1");
    const heroGlow2 = document.querySelector(".hero-glow-2");
    if (!hero || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    hero.addEventListener("mousemove", (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 22;
        const y = (event.clientY / window.innerHeight - 0.5) * 22;
        if (heroGlow1) {
            gsap.to(heroGlow1, { x, y, duration: 0.6, overwrite: true });
        }
        if (heroGlow2) {
            gsap.to(heroGlow2, { x: -x * 0.8, y: -y * 0.8, duration: 0.6, overwrite: true });
        }
    });
}

function initTestimonialLoop() {
    if (!testimonialTrack) {
        return;
    }

    const cards = testimonialTrack.children;
    if (cards.length === 0) {
        return;
    }

    const clone = testimonialTrack.innerHTML;
    testimonialTrack.insertAdjacentHTML("beforeend", clone);

    gsap.to(testimonialTrack, {
        xPercent: -50,
        ease: "none",
        duration: 24,
        repeat: -1
    });
}

function initTeamCarousel() {
    const carouselEl = document.getElementById("team-carousel");
    const trackEl = document.getElementById("team-track");
    const prevBtn = document.getElementById("team-prev");
    const nextBtn = document.getElementById("team-next");

    if (!carouselEl || !trackEl) {
        return;
    }

    const cards = Array.from(trackEl.children);
    if (!cards.length) {
        return;
    }

    if (!trackEl.dataset.cloned) {
        trackEl.insertAdjacentHTML("beforeend", trackEl.innerHTML);
        trackEl.dataset.cloned = "true";
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const duration = isMobile ? 68 : 44;

    if (prefersReducedMotion) {
        carouselEl.classList.add("reduced-motion");
    }

    trackEl.classList.add("is-gsap");

    const tween = gsap.to(trackEl, {
        xPercent: -50,
        ease: "none",
        duration,
        repeat: -1,
        paused: prefersReducedMotion
    });

    const wrapProgress = gsap.utils.wrap(0, 1);
    const getHalfTrackWidth = () => Math.max(trackEl.scrollWidth / 2, 1);

    const setPaused = (paused) => {
        if (prefersReducedMotion) {
            return;
        }
        if (paused) {
            tween.pause();
        } else {
            tween.play();
        }
    };

    const stepByCards = (direction) => {
        const firstCard = trackEl.querySelector(".team-card");
        if (!firstCard) {
            return;
        }

        const styles = window.getComputedStyle(trackEl);
        const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
        const step = (firstCard.getBoundingClientRect().width + gap) * 2;
        const deltaProgress = step / getHalfTrackWidth();
        tween.progress(wrapProgress(tween.progress() + direction * deltaProgress));
    };

    prevBtn && prevBtn.addEventListener("click", () => {
        setPaused(true);
        stepByCards(-1);
        window.setTimeout(() => setPaused(false), 1800);
    });

    nextBtn && nextBtn.addEventListener("click", () => {
        setPaused(true);
        stepByCards(1);
        window.setTimeout(() => setPaused(false), 1800);
    });

    carouselEl.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            setPaused(true);
            stepByCards(-1);
            window.setTimeout(() => setPaused(false), 1200);
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            setPaused(true);
            stepByCards(1);
            window.setTimeout(() => setPaused(false), 1200);
        }
    });

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startProgress = 0;

    carouselEl.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) {
            return;
        }
        dragging = true;
        moved = false;
        startX = event.clientX;
        startProgress = tween.progress();
        carouselEl.classList.add("is-dragging");
        setPaused(true);
        carouselEl.setPointerCapture(event.pointerId);
    });

    carouselEl.addEventListener("pointermove", (event) => {
        if (!dragging) {
            return;
        }
        const deltaX = event.clientX - startX;
        if (Math.abs(deltaX) > 4) {
            moved = true;
        }
        const nextProgress = wrapProgress(startProgress - deltaX / getHalfTrackWidth());
        tween.progress(nextProgress);
        event.preventDefault();
    });

    const endDrag = (event) => {
        if (!dragging) {
            return;
        }
        dragging = false;
        carouselEl.classList.remove("is-dragging");
        try {
            carouselEl.releasePointerCapture(event.pointerId);
        } catch {
            // ignore when pointer capture is already released
        }
        carouselEl.dataset.dragged = moved ? "true" : "false";
        window.setTimeout(() => setPaused(false), 250);
    };

    carouselEl.addEventListener("pointerup", endDrag);
    carouselEl.addEventListener("pointercancel", endDrag);
    carouselEl.addEventListener("pointerleave", (event) => {
        if (dragging) {
            endDrag(event);
        }
    });

    carouselEl.addEventListener(
        "click",
        (event) => {
            if (carouselEl.dataset.dragged === "true") {
                event.preventDefault();
                event.stopPropagation();
                carouselEl.dataset.dragged = "false";
            }
        },
        true
    );

    carouselEl.addEventListener("mouseenter", () => setPaused(true));
    carouselEl.addEventListener("mouseleave", () => setPaused(false));
    carouselEl.addEventListener("focusin", () => setPaused(true));
    carouselEl.addEventListener("focusout", () => setPaused(false));
    carouselEl.addEventListener("touchstart", () => setPaused(true), { passive: true });
    carouselEl.addEventListener("touchend", () => {
        window.setTimeout(() => setPaused(false), 300);
    }, { passive: true });
    carouselEl.addEventListener("touchcancel", () => setPaused(false), { passive: true });

    trackEl.querySelectorAll(".team-card").forEach((card) => {
        card.addEventListener("mouseenter", () => setPaused(true));
        card.addEventListener("mouseleave", () => setPaused(false));
        card.addEventListener("focusin", () => setPaused(true));
        card.addEventListener("focusout", () => setPaused(false));
    });
}

function initAcademyVideoAutoplay() {
    const academyVideo = document.getElementById("academy-video");
    if (!academyVideo) {
        return;
    }

    const videoSrc = academyVideo.dataset.src;
    if (!videoSrc) {
        return;
    }

    const toEmbedUrl = (rawUrl) => {
        try {
            const parsed = new URL(rawUrl);
            const host = parsed.hostname.replace(/^www\./, "");
            let videoId = "";

            if (host === "youtu.be") {
                videoId = parsed.pathname.replace(/^\//, "").split("/")[0];
            } else if (host === "youtube.com" || host === "m.youtube.com") {
                if (parsed.pathname === "/watch") {
                    videoId = parsed.searchParams.get("v") || "";
                } else if (parsed.pathname.startsWith("/shorts/")) {
                    videoId = parsed.pathname.split("/")[2] || "";
                } else if (parsed.pathname.startsWith("/embed/")) {
                    return rawUrl;
                }
            }

            if (!videoId) {
                return rawUrl;
            }

            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&controls=1&enablejsapi=1&loop=1&playlist=${videoId}`;
        } catch {
            return rawUrl;
        }
    };

    const normalizedVideoSrc = toEmbedUrl(videoSrc);

    let hasLoaded = false;

    const sendPlayerCommand = (func) => {
        if (!academyVideo.contentWindow) {
            return;
        }
        academyVideo.contentWindow.postMessage(
            JSON.stringify({ event: "command", func, args: [] }),
            "*"
        );
    };

    const playVideo = () => {
        if (!hasLoaded) {
            academyVideo.src = normalizedVideoSrc;
            hasLoaded = true;
            return;
        }
        sendPlayerCommand("playVideo");
    };

    const pauseVideo = () => {
        if (!hasLoaded) {
            return;
        }
        sendPlayerCommand("pauseVideo");
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            });
        },
        {
            threshold: 0.45
        }
    );

    observer.observe(academyVideo);
}

function initSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }
            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            closeMobileMenu();

            const y = target.getBoundingClientRect().top + window.scrollY - 84;
            window.scrollTo({ top: y, behavior: "smooth" });
        });
    });
}

function initChatbot() {
    if (!chatToggle || !chatPanel) {
        return;
    }
    chatToggle.addEventListener("click", () => {
        const isOpen = chatPanel.classList.toggle("is-open");
        chatToggle.setAttribute("aria-expanded", String(isOpen));
        chatToggle.textContent = isOpen ? "Close" : "Chat";
    });
}

function initProofCounters() {
    const counters = document.querySelectorAll(".proof-metric[data-count]");
    counters.forEach((counter) => {
        const target = Number(counter.dataset.count || "0");
        const prefix = counter.dataset.prefix || "";
        const suffix = counter.dataset.suffix || "";
        const state = { value: 0 };

        gsap.to(state, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%"
            },
            onUpdate: () => {
                counter.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
            }
        });
    });
}

function initCaseFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".case-card[data-industry]");
    if (!filterBtns.length || !cards.length) {
        return;
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;
            filterBtns.forEach((item) => item.classList.remove("is-active"));
            btn.classList.add("is-active");

            cards.forEach((card) => {
                const industry = card.dataset.industry;
                const match = filter === "all" || industry === filter;
                card.classList.toggle("is-hidden", !match);
            });
        });
    });
}

function initTools() {
    const seo = document.getElementById("seo-maturity");
    const ai = document.getElementById("ai-coverage");
    const schema = document.getElementById("schema-readiness");
    const visibility = document.getElementById("visibility-score");

    const budgetRange = document.getElementById("budget-range");
    const budgetValue = document.getElementById("budget-value");
    const mixPaid = document.getElementById("mix-paid");
    const mixSeo = document.getElementById("mix-seo");
    const mixCreative = document.getElementById("mix-creative");

    const updateVisibility = () => {
        if (!seo || !ai || !schema || !visibility) {
            return;
        }
        const score = Math.round((Number(seo.value) * 0.35) + (Number(ai.value) * 0.4) + (Number(schema.value) * 0.25));
        visibility.textContent = String(score);
    };

    const updateMix = () => {
        if (!budgetRange || !budgetValue || !mixPaid || !mixSeo || !mixCreative) {
            return;
        }
        const budget = Number(budgetRange.value);
        const paid = Math.round(budget * 0.5);
        const seoBudget = Math.round(budget * 0.3);
        const creative = budget - paid - seoBudget;

        budgetValue.textContent = `$${budget.toLocaleString()}`;
        mixPaid.textContent = `$${paid.toLocaleString()}`;
        mixSeo.textContent = `$${seoBudget.toLocaleString()}`;
        mixCreative.textContent = `$${creative.toLocaleString()}`;
    };

    [seo, ai, schema].forEach((el) => el && el.addEventListener("input", updateVisibility));
    budgetRange && budgetRange.addEventListener("input", updateMix);
    updateVisibility();
    updateMix();
}

function initMultiStepForm() {
    const form = document.getElementById("contact-form");
    if (!form) {
        return;
    }

    const steps = Array.from(form.querySelectorAll(".form-step"));
    const success = document.getElementById("form-success");
    let currentStep = 0;

    const showStep = (index) => {
        steps.forEach((step, i) => {
            step.classList.toggle("is-active", i === index);
        });
        currentStep = index;
    };

    const validateStep = (index) => {
        const inputs = steps[index].querySelectorAll("input, textarea, select");
        for (const input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
    };

    form.querySelectorAll(".step-next").forEach((button) => {
        button.addEventListener("click", () => {
            if (!validateStep(currentStep)) {
                return;
            }
            showStep(Math.min(currentStep + 1, steps.length - 1));
        });
    });

    form.querySelectorAll(".step-prev").forEach((button) => {
        button.addEventListener("click", () => {
            showStep(Math.max(currentStep - 1, 0));
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateStep(currentStep)) {
            return;
        }
        form.reset();
        showStep(0);
        success && success.classList.remove("hidden");
    });
}

function initStickyCta() {
    if (!stickyCta) {
        return;
    }

    const introCallSection = document.getElementById("intro-call");

    const update = () => {
        const passedThreshold = window.scrollY > 580;

        if (!introCallSection) {
            stickyCta.classList.toggle("is-visible", passedThreshold);
            return;
        }

        const sectionRect = introCallSection.getBoundingClientRect();
        const sectionTop = window.scrollY + sectionRect.top;
        const sectionBottom = sectionTop + introCallSection.offsetHeight;

        // Hide the floating CTA shortly before intro-call enters view,
        // and keep it hidden until the section is mostly passed.
        const hideStart = sectionTop - window.innerHeight * 0.65;
        const hideEnd = sectionBottom - window.innerHeight * 0.15;
        const inIntroCallZone = window.scrollY >= hideStart && window.scrollY <= hideEnd;

        const shouldShow = passedThreshold && !inIntroCallZone;
        stickyCta.classList.toggle("is-visible", shouldShow);
    };

    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    update();
}

function initExitIntentModal() {
    if (!exitModal || !exitClose) {
        return;
    }

    const storageKey = "buzzap-exit-modal-shown";

    const openModal = () => {
        exitModal.classList.add("is-open");
        exitModal.setAttribute("aria-hidden", "false");
        localStorage.setItem(storageKey, "1");
    };

    const closeModal = () => {
        exitModal.classList.remove("is-open");
        exitModal.setAttribute("aria-hidden", "true");
    };

    document.addEventListener("mouseleave", (event) => {
        if (event.clientY > 8) {
            return;
        }
        if (localStorage.getItem(storageKey) === "1") {
            return;
        }
        openModal();
    });

    exitClose.addEventListener("click", closeModal);
    exitModal.addEventListener("click", (event) => {
        if (event.target === exitModal) {
            closeModal();
        }
    });

    const exitForm = document.querySelector(".exit-form");
    exitForm && exitForm.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModal();
    });
}

function initCustomCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) {
        return;
    }

    window.addEventListener("mousemove", (event) => {
        gsap.to(dot, { x: event.clientX, y: event.clientY, duration: 0.08, overwrite: true });
        gsap.to(ring, { x: event.clientX, y: event.clientY, duration: 0.2, overwrite: true });
    });
}

function initMagneticButtons() {
    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    document.querySelectorAll(".magnetic").forEach((element) => {
        element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            gsap.to(element, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        });

        element.addEventListener("mouseleave", () => {
            gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
        });
    });
}

function initScrollProgress() {
    const bar = document.getElementById("scroll-progress-bar");
    if (!bar) {
        return;
    }
    const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
}

function initActiveNav() {
    const sections = document.querySelectorAll("section[id], main[id]");
    const navLinks = document.querySelectorAll(".nav-link[href^='#']");
    if (!sections.length || !navLinks.length) {
        return;
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "is-active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        { rootMargin: "-48% 0px -48% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
}

function initCardSpotlight() {
    if (window.matchMedia("(pointer: coarse)").matches) {
        return;
    }
    const cards = document.querySelectorAll(
        ".service-card, .case-card, .blog-card, .team-card, .proof-card, .tool-card"
    );
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
        card.addEventListener("mouseleave", () => {
            card.style.setProperty("--mouse-x", "-9999px");
            card.style.setProperty("--mouse-y", "-9999px");
        });
    });
}

function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) {
        return;
    }
    window.addEventListener(
        "scroll",
        () => btn.classList.toggle("is-visible", window.scrollY > 800),
        { passive: true }
    );
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initResultBars() {
    const fills = document.querySelectorAll(".result-bar-fill");
    if (!fills.length) {
        return;
    }
    gsap.registerPlugin(ScrollTrigger);
    fills.forEach((fill) => {
        ScrollTrigger.create({
            trigger: fill,
            start: "top 88%",
            onEnter: () => fill.classList.add("is-filled")
        });
    });
}

function initLeadMagnetForm() {
    const form = document.getElementById("lead-magnet-form");
    const success = document.getElementById("lead-magnet-success");
    if (!form || !success) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && !emailInput.checkValidity()) {
            emailInput.reportValidity();
            return;
        }

        success.hidden = false;
        form.reset();
    });
}

function initIntroSequence() {
    if (!introOverlay || !siteShell) {
        return Promise.resolve();
    }

    return new Promise((resolve) => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
                introOverlay.style.display = "none";
                resolve();
            }
        });

        tl.set([".intro-buz", ".intro-zap", ".intro-bolt", ".intro-tagline"], {
            opacity: 0,
            y: 30
        });

        tl.set(".intro-logo", { filter: "blur(11px)", scale: 0.9 });
        tl.set(".intro-bolt path", { strokeDashoffset: 390 });
        tl.set([".intro-shutter-top", ".intro-shutter-bottom"], { opacity: 0 });
        tl.set(".intro-tagline", { letterSpacing: "0.025em" });

        tl.fromTo(
            ".intro-grid",
            { opacity: 0.08, scale: 1.1 },
            { opacity: 0.72, scale: 1, duration: 1.08 }
        )
            .to(".intro-shutter-top", { yPercent: 100, duration: 0.58, ease: "power2.inOut" }, "<+0.12")
            .to(".intro-shutter-bottom", { yPercent: -100, duration: 0.58, ease: "power2.inOut" }, "<")
            .to(".intro-logo", { filter: "blur(0px)", scale: 1, duration: 0.58 }, "-=0.24")
            .fromTo(".intro-buz", { x: -90 }, { opacity: 1, y: 0, x: 0, duration: 0.54 }, "-=0.24")
            .to(".intro-bolt", { opacity: 1, y: 0, scale: 1.1, duration: 0.32 }, "-=0.2")
            .to(".intro-bolt path", { strokeDashoffset: 0, duration: 0.42, ease: "power2.out" }, "<")
            .fromTo(".intro-zap", { x: 90 }, { opacity: 1, y: 0, x: 0, duration: 0.54 }, "-=0.24")
            .to(
                ".intro-bolt",
                {
                    keyframes: [
                        { scale: 0.9, rotation: -5, duration: 0.08 },
                        { scale: 1.16, rotation: 3.5, duration: 0.1 },
                        { scale: 0.96, rotation: -2.6, duration: 0.08 },
                        { scale: 1.08, rotation: 2.2, duration: 0.08 },
                        { scale: 1, rotation: 0, duration: 0.14 }
                    ],
                    ease: "power1.inOut"
                },
                "-=0.08"
            )
            .to(".intro-tagline", { opacity: 1, y: 0, letterSpacing: "0.012em", duration: 0.52 }, "-=0.22")
            .to(".intro-flash", { opacity: 1, duration: 0.05, yoyo: true, repeat: 2 }, "+=0.28")
            .to(
                ".intro-wipe",
                { xPercent: 265, duration: 0.58, ease: "power2.inOut" },
                "-=0.03"
            )
            .to(
                [".intro-logo", ".intro-tagline", ".intro-core-glow", ".intro-grid", ".intro-noise", ".intro-vignette"],
                {
                    opacity: 0,
                    scale: 0.99,
                    duration: 0.42,
                    ease: "power2.in"
                },
                "-=0.1"
            )
            .to(introOverlay, { opacity: 0, duration: 0.32 }, "-=0.1")
            .to(siteShell, { opacity: 1, y: 0, duration: 0.62 }, "-=0.06");
    });
}

menuToggle && menuToggle.addEventListener("click", toggleMobileMenu);
window.addEventListener("scroll", setHeaderState);
setHeaderState();

initIntroSequence().then(() => {
    createParticles();
    initRevealAnimation();
    initHeroAnimation();
    initHeroParallax();
    initTestimonialLoop();
    initTeamCarousel();
    initAcademyVideoAutoplay();
    initSmoothAnchorScroll();
    initChatbot();
    initProofCounters();
    initCaseFilters();
    initTools();
    initMultiStepForm();
    initStickyCta();
    initExitIntentModal();
    initCustomCursor();
    initMagneticButtons();
    initScrollProgress();
    initActiveNav();
    initCardSpotlight();
    initBackToTop();
    initResultBars();
    initLeadMagnetForm();
});
