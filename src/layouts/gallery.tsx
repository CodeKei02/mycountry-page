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

  useEffect(() => {
    if (!galleryRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const imageElements = galleryRef.current!.querySelectorAll("img");
      const title = wrapperRef.current!.querySelector(".title");

      const split = new SplitText(title, { type: "chars" });

      gsap.fromTo(
        split.chars,
        {
          y: (i: number) => (i % 2 === 0 ? -72 : 72),
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      gsap.set(galleryRef.current, {
        scale: 0.75,
        opacity: 0.4,
        y: 120,
      });

      gsap.to(galleryRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full flex flex-col items-center justify-center py-20 min-h-screen"
    >
      <h1 className="text-6xl font-bold text-white title">VENEZUELA</h1>
      <div
        ref={galleryRef}
        className="w-[90%] grid grid-cols-1 md:block md:columns-3 gap-x-3 gap-y-1"
      >
        {images.map((image) => (
          <img
            src={image.src}
            alt={image.alt}
            className="w-full inline-block mb-2 object-cover opacity-0"
          />
        ))}
      </div>
    </div>
  );
};
