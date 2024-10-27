import React from "react";
import FootballAnimation from "./footballAnimation";
import TextHoverAnimation from "./textHoverAnimation";
import { SlBadge } from "react-icons/sl";

const Home: React.FC = () => {
  return (
    <section
      id="home"
      className="relative flex animate-zoomIn justify-center min-h-screen bg-primary overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="./bg-image.webp"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Inner Shadow Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./bg-image.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 20px 20px 100px 100px rgba(0, 0, 0, 0.9)", // Inner shadow on all sides
        }}
      />
      
      {/* Text */}
      <div className="absolute left-5 md:left-10 lg:left-[11rem] bottom-[8rem] flex flex-col select-none">
        <h1 className="relative uppercase flex gap-3 items-center text-sm md:text-lg font-special italic font-extrabold text-white/60 z-[11] opacity-0 animate-lineUp delay-700">
          <span>
            <SlBadge />
          </span>
          South india's no.1
        </h1>
        <h1 className="relative uppercase text-lg sm:text-2xl md:text-3xl lg:text-5xl font-special italic font-extrabold text-white z-[11] opacity-0 animate-lineUp delay-1000">
          <TextHoverAnimation text="Sports" />
          <TextHoverAnimation text="infrastructure" />
        </h1>
      </div>
      <div className="absolute bottom-[7rem] md:bottom-[4rem] right-0 z-[10] w-[50%] md:w-[30%] h-[30%]">
        <FootballAnimation />
      </div>
    </section>
  );
};

export default Home;
