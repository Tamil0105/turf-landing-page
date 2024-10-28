import React, { useEffect, useState } from "react";
import Navbar from "./components/navBar";
import Home from "./components/home";
import IconsWithContent from "./components/iconsWithContent";
import Services from "./components/services";
import Contact from "./components/contact";
import CursorFollower from "./components/customCursor";
import Preloader from "./components/preLoading";
import PageWrapper from "./components/pageWrapper";
import ScrollProgress from "./components/scrollProgress";
import AboutUs from "./components/aboutUs";
import Testimonials from "./components/tetimonials";
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Simulate a loading duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="w-screen h-screen bg-primary">
          <Preloader isLoading={isLoading} onComplete={handleLoadingComplete} />
        </div>
      )}
      {!isLoading && (
        <div className={`w-screen h-screen bg-primary no-scrollbar`}>
          <Navbar />
          <CursorFollower />
          <ScrollProgress />
          <PageWrapper>
            <div id="home">
              <Home />
            </div>
          </PageWrapper>

          <PageWrapper>
            <div id="iconsWithContent">
              <IconsWithContent />
            </div>
          </PageWrapper>

         
          <PageWrapper>
            <div id="aboutUs">
              <AboutUs/>
            </div>
          </PageWrapper>

          <PageWrapper>
            <div id="services">
              <Services />
            </div>
          </PageWrapper>

         

          <div id="tetimonials">
              <Testimonials />
            </div>
          <PageWrapper>
            <div id="contact">
              <Contact />
            </div>
          </PageWrapper>
          {/* <PageWrapper> */}
           
            
          {/* </PageWrapper> */}
          {/* <div id="home">
            <Home />
          </div>
          <div id="about">
            <About />
          </div>
          <div id="services">
            <Services />
          </div>
          <div id="contact">
            <Contact />
          </div> */}
        </div>
      )}
    </>
  );
};

export default App;
