import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import _ from 'lodash';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const initializedRef = useRef<boolean>(false);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    lenisRef.current = new Lenis();
    const lenis = lenisRef.current;

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Animation frame function
    const raf = (time: number) => {
      if (lenis) lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Resize event handler
    const onWindowResize = _.debounce(() => {
      console.log('Window resized!');
      initializeScrollTrigger(); // Reinitialize ScrollTrigger on resize
    }, 500);

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (lenis) lenis.destroy(); // Clean up Lenis
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up scroll triggers
    };
  }, []);

  const initializeScrollTrigger = () => {
    const gsapBl = document.querySelector('.gsap__bl') as HTMLDivElement;
    const gsapTrack = document.querySelector('.gsap__track') as HTMLDivElement;

    const gsapBlWidth = gsapBl?.offsetWidth || 0;
    const gsapTrackWidth = gsapTrack?.offsetWidth || 0;
    const scrollSliderTransform = gsapTrackWidth - gsapBlWidth;

    // If already initialized, kill existing triggers
    if (initializedRef.current) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    } else {
      initializedRef.current = true; // Mark as initialized
    }

    // Create a new ScrollTrigger
    gsap.to('.gsap__track', {
      scrollTrigger: {
        trigger: '.gsap_slider',
        start: 'center center',
        end: () => `+=${gsapTrackWidth}`,
        pin: true,
        scrub: true,
      },
      x: `-=${scrollSliderTransform}px`,
    });
  };

  return { initializeScrollTrigger };
};

export default useLenis;
