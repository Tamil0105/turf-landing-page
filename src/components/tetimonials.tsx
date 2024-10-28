


import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import _ from 'lodash';
import { MdMusicNote, MdMusicOff } from 'react-icons/md';
import TextHoverAnimation from './textHoverAnimation';
import { FaPause, FaPlay } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {
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
                    {Array.from({ length: 8 }).map((_,) => (
                   <div className="t flex m-4 ">
                      <VideoCard videoSrc={`https://video.wixstatic.com/video/4c43d3_e63e67f577324499b6662c4ae08a9b2f/360p/mp4/file.mp4`} />

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
const VideoCard: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // Start with video playing
  const [isMuted, setIsMuted] = useState(true); // Start with video muted

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; // Toggle muted state
      setIsMuted(!isMuted); // Update state
    }
  };

  return (
    <div className="video-card">
    
      <video 
        ref={videoRef}
        src={videoSrc} 
        loop 
        autoPlay // Autoplay the video
        muted={isMuted} // Control mute based on state
        className="video" 
      />
      <button className="play-button flex justify-center items-center" onClick={togglePlay}>
        {isPlaying ? <FaPause/> : <FaPlay/>}
      </button>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? <MdMusicOff/> : <MdMusicNote/>} {/* Show sound icon based on mute state */}
      </button>
    </div>
  );

};
export default Testimonials;