import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapGsap } from "@/ui/map-gsap";

gsap.registerPlugin(ScrollTrigger);

export const Intro = ({ title }: { title: string }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.history) return;

    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (!introRef.current || !titleRef.current || !arrowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        autoAlpha: 0,
        x: -80,
        scale: 0.9,
        ease: "none",
      });

      gsap.to(arrowRef.current, {
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        autoAlpha: 0,
        y: 50,
        scale: 0.9,
        ease: "none",
      });

      gsap.to(".arrow", {
        y: 20,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <div ref={introRef} className="h-30 relative">
        <h1
          ref={titleRef}
          className="uppercase text-white font-bold text-3xl md:text-6xl flex justify-center items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {title}
        </h1>
        <span
          ref={arrowRef}
          className="arrow fixed left-1/2 bottom-10 -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-arrow-down-icon lucide-circle-arrow-down"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </span>
      </div>
      <MapGsap />
    </div>
  );
};
