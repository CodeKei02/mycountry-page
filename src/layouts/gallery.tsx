import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const Gallery = ({
  images,
}: {
  images: { src: string; alt: string }[];
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !galleryRef.current ||
      !wrapperRef.current ||
      !titleRef.current ||
      !navBgRef.current
    )
      return;

    const split = new SplitText(titleRef.current, { type: "chars" });

    const ctx = gsap.context(() => {
      const imageElements = galleryRef.current!.querySelectorAll("img");

      gsap.set(split.chars, {
        y: (i: number) => (i % 2 === 0 ? -72 : 72),
        opacity: 0,
      });

      gsap.set(navBgRef.current, { opacity: 0 });

      gsap.set(galleryRef.current, {
        scale: 0.95,
        opacity: 0,
        y: 80,
      });

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      });

      titleTl
        .to(split.chars, {
          y: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          duration: 0.5,
        })

        .to(
          titleRef.current,
          {
            y: () => -(window.innerHeight / 2 - 40),
            scale: 0.4,
            ease: "power2.inOut",
            duration: 0.5,
          },
          ">",
        )
        .to(
          navBgRef.current,
          {
            opacity: 1,
            ease: "power2.inOut",
            duration: 0.5,
          },
          "<",
        )
        .to(
          galleryRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 0.8,
          },
          "<",
        );

      gsap.fromTo(
        wrapperRef.current,
        { scale: 1 },
        {
          scale: 1.07,
          ease: "none",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=60%",
            scrub: true,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        },
      );

      imageElements.forEach((image) => {
        gsap.set(image, { opacity: 0, y: 40, scale: 0.95 });

        gsap.to(image, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, wrapperRef);

    (window as any).__ST = ScrollTrigger;
    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={navBgRef}
        className="fixed top-0 left-0 w-full h-20 bg-black z-40 pointer-events-none"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <h1
          ref={titleRef}
          className="title text-6xl font-bold text-white will-change-transform"
        >
          VENEZUELA
        </h1>
      </div>
      <div
        ref={wrapperRef}
        className="w-full flex flex-col items-center justify-center py-20"
      >
        <div
          ref={galleryRef}
          className="w-[90%] grid grid-cols-1 md:block md:columns-3 gap-x-3 gap-y-1"
        >
          {images.map((image) => (
            <img
              src={image.src}
              alt={image.alt}
              className="w-full inline-block my-4 object-cover opacity-0"
            />
          ))}
        </div>
      </div>
    </>
  );
};
