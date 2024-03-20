import React,{ useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollAnimation = (
  direction = "bottom",
  distance = 200,
  duration = 1
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    gsap.to(elementRef.current, {
      opacity: 1,
      x:0,
      y:0,
      duration,
    });
  }, [direction, distance, duration]);
 
  const animateOut = useCallback(() => {
    gsap.to(elementRef.current, {
      opacity: 1,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "bottom" ? -distance : direction === "top" ? distance : 0,
      duration,
    });
  }, [direction, distance, duration]);

  useEffect(() => {
    const element: any = elementRef.current;
    gsap.set(element, {
      opacity: 1,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "bottom" ? -distance : direction === "top" ? distance : 0,
      scale: 1,
      transform: "translate3d(0, 0, 0)",
    });

    const checkVisibility = () => {
      if (elementRef.current && elementRef.current.getBoundingClientRect().top < window.innerHeight) {
        animateIn();
      } else {
        animateOut();
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      start: "top bottom-=50",
      onEnter: animateIn,
      onLeave: animateOut,
      onEnterBack: animateIn,
      onLeaveBack: animateOut,
      scrub: true,
    });

    checkVisibility();
    ScrollTrigger.refresh();

    return () => {
      scrollTrigger.kill();
    };
  }, [animateIn, animateOut, direction, distance]);

  return elementRef;
}
export default useScrollAnimation

