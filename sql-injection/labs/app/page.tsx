import AnimatedBackground from "@/app/components/AnimatedBackground";
import NavBar from "@/app/components/NavBar";
import HeroSection from "@/app/components/HeroSection";
import WhatYoullLearn from "@/app/components/WhatYoullLearn";
import LearningJourney from "@/app/components/LearningJourney";
import CourseOverview from "@/app/components/CourseOverview";
import InteractiveLabs from "@/app/components/InteractiveLabs";
import StorySection from "@/app/components/StorySection";
import Features from "@/app/components/Features";
import CallToAction from "@/app/components/CallToAction";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <NavBar />
      <main>
        <HeroSection />
        <WhatYoullLearn />
        <LearningJourney />
        <CourseOverview />
        <InteractiveLabs />
        <StorySection />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
