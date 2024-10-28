

import React, { useEffect, } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import _ from "lodash";

import { useTestimonials } from "@/hook/useTestimonials";
import TextHoverAnimation from "./textHoverAnimation";
import VideoCard from "./videoCard/main";
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
  const { queryClient } = useTestimonials();

  const data =
    (queryClient.getQueryData(["testimonials"]) as Testimonial[]) ?? [];

  console.log(data.map((test) => test.mediaUrl));

  useEffect(() => {
    // Function to initialize ScrollTrigger
    const initializeScrollTrigger = () => {
      const gsapBl = document.querySelector(".gsap__bl") as HTMLDivElement;
      const gsapTrack = document.querySelector(
        ".gsap__track"
      ) as HTMLDivElement;

      const gsapBlWidth = gsapBl?.offsetWidth || 0;
      const gsapTrackWidth = gsapTrack?.offsetWidth || 0;
      const scrollSliderTransform = gsapTrackWidth - gsapBlWidth;

      // Clean up existing ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Create a new ScrollTrigger
      gsap.to(".gsap__track", {
        x: `-=${scrollSliderTransform}px`,
        scrollTrigger: {
          trigger: ".gsap_slider",
          start: "center center",
          end: () => `+=${gsapTrackWidth}`,
          pin: true,
          scrub: true,
        },
      });
    };

    initializeScrollTrigger(); // Initial call to set up ScrollTrigger

    // Resize event handler
    const onWindowResize = _.debounce(() => {
      console.log("Window resized!");
      initializeScrollTrigger(); // Reinitialize ScrollTrigger on resize
    }, 100);

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Clean up scroll triggers
    };
  }, []);

  return (
    <div className="wrapp p-6">
      <header className="header p-2">
        <div className="content flex gap-3 flex-col">
          <h1 className="relative uppercase text-lg sm:text-2xl md:text-3xl lg:text-5xl font-special italic font-extrabold text-white z-[11] opacity-0 animate-lineUp delay-1000">
            <TextHoverAnimation text="Testimonials" />
          </h1>
          <p className="text-base md:text-lg lg:text-2xl xl:text-3xl text-white/40 font-primary">
            Discover the heartfelt words of those we've had the privilege to
            serve. Our client's stories reflect the passion and dedication we
            bring to every moment."
          </p>
        </div>
      </header>
      <div className="block md:hidden grid justify-center items-center gap-4 border grid-cols-1 sm:grid-cols-2">
        {data.map((test, i) => (
          <VideoCard key={i} videoSrc={test.mediaUrl} />
        ))}
      </div>

      <main className="main hidden md:block">
        <section className="section-slider gsap_slider">
          <div className="content">
            <div className="section__slider gsap_h">
              <div className="gsap__bl">
                <div className="gsap__inner">
                  <div className="gsap__track">
                    {data.map((test, i) => (
                      <div className="t flex m-4 ">
                        <VideoCard videoSrc={test.mediaUrl} />
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
              voluptatem fugit accusamus fuga vero quos, sint est laboriosam
              eveniet ea! ...
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Testimonials;
