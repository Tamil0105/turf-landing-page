


import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import _ from 'lodash';
import '../index.css'
import TextHoverAnimation from './textHoverAnimation';
import { useTestimonials } from '@/hook/useTestimonials';
import VideoCard from './videoCard/main';
type Testimonial = {
    id: number;
    authorName: string;
    content: string;
    rating: number;
    createdAt: Date;
    fileType: "image" | "video" | "youtube" | "instagram";
    mediaUrl: string;
  };
gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {

    const {queryClient} = useTestimonials()

    const data =  (queryClient.getQueryData(['testimonials'])as Testimonial[])??[] 

    console.log(data)
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({ duration: 1.2 });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // GSAP ticker for Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // ScrollTrigger animation
    const scrollTrig = () => {
      const gsapBl = document.querySelector('.gsap__bl') as HTMLDivElement;
      const gsapTrack = document.querySelector('.gsap__track') as HTMLDivElement;

      const gsapBlWidth = gsapBl?.offsetWidth || 0;
      const gsapTrackWidth = gsapTrack?.offsetWidth || 0;
      const scrollSliderTransform = gsapTrackWidth - gsapBlWidth;

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
    scrollTrig();

    // Resize event handler
    const onWindowResize = _.debounce(() => {
      console.log('Window resized!');
      window.location.reload();
    }, 500);

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clean up scroll triggers
    };
  }, []);

  return (
    <div className="wrapp py-8 px-10 bg-primary">
      <header className="header py-10">
        <div className="content flex gap-3 flex-col">
        <h1 className="py-3 relative uppercase text-lg sm:text-2xl md:text-3xl lg:text-5xl font-special italic font-extrabold text-white z-[11] opacity-0 animate-lineUp delay-1000">
          <TextHoverAnimation text="Testimonials" />
        </h1>
          <p className='gap-10 text-3xl text-white/40 font-primary'>
          Discover the heartfelt words of those we've had the privilege to serve. Our client's stories reflect the passion and dedication we bring to every moment."
          </p>
        </div>
      </header>

      <main className="main">
        <section className="section-slider gsap_slider">
          <div className="content">
            <div className="section__slider gsap_h">
              <div className="gsap__bl">
                <div className="gsap__inner">
                  <div className="gsap__track">
                    {Array?.from(data)?.map((t,) => (
                   <div className=" flex m-4 ">
                      <VideoCard videoSrc={t.mediaUrl} />

                 </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-text">
          <div className="content">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
              voluptatem fugit accusamus fuga vero quos, sint est laboriosam eveniet ea! ...
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};




export default Testimonials;