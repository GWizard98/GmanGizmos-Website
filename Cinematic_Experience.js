console.log('GSAP Loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger Loaded:', typeof ScrollTrigger !== 'undefined');

gsap.registerPlugin(ScrollTrigger);

gsap.to("#hero-video-section", {
    opacity: 0,
    scrollTrigger: {
        trigger: "#hero-video-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gasp.to("hero h1", {
    opacity: 0,
    y: -100,
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

gsap.utils.toArray('section:not(#hero):not(#heo-video-section)').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: 1
        }
    });
});

gsap.utils.toArray('h2').forEach(heading => {
    gsap.from(heading, {
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            end: "top 60%",
            scrub: 1
        }
    });
});

console.log('Animations ready');