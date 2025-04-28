'use client';

import { useEffect, useRef, useState } from "react";
import { testimonials1, testimonials2 } from "@/data/testimonial";
import { useMediaQuery } from "react-responsive";
import { type Testimonial } from "@/types";

export default function HomepageTestimonial() {
    const container1Ref = useRef<HTMLDivElement>(null);
    const container2Ref = useRef<HTMLDivElement>(null);
    const animationRef1 = useRef<number | undefined>(undefined);
    const animationRef2 = useRef<number | undefined>(undefined);
    const currentOffset1 = useRef<number>(0);
    const currentOffset2 = useRef<number>(0);
    let scrollSpeed = 0.3;
    let animationDuration = 5; // default duration for large screens

    const [direction1, setDirection1] = useState<
        "up" | "down" | "left" | "right"
    >("up");
    const [direction2, setDirection2] = useState<
        "up" | "down" | "left" | "right"
    >("down");
    const isLargeScreen = useMediaQuery({ minWidth: 1024 });

    if (!isLargeScreen) {
        animationDuration = 10;
        scrollSpeed = 0.5; // slower speed for smaller screens
    }

    const startLoopScroll = (
        container: HTMLDivElement | null,
        direction: "up" | "down" | "left" | "right",
        currentOffset: React.MutableRefObject<number>,
        animationRef: React.MutableRefObject<number | undefined>,
        isVertical: boolean
    ) => {
        if (!container) return;
        if (animationRef.current) cancelAnimationFrame(animationRef.current);

        const contentSize = isVertical
            ? container.scrollHeight
            : container.scrollWidth;
        const containerSize = isVertical
            ? container.clientHeight
            : container.clientWidth;

        const animate = () => {
            if (isVertical) {
                currentOffset.current +=
                    direction === "up" ? scrollSpeed : -scrollSpeed;
                if (direction === "up" && currentOffset.current >= containerSize)
                    currentOffset.current = -contentSize;
                if (direction === "down" && currentOffset.current <= -contentSize)
                    currentOffset.current = containerSize;
                container.style.transform = `translateY(${currentOffset.current}px)`;
            } else {
                currentOffset.current +=
                    direction === "left" ? scrollSpeed : -scrollSpeed;
                if (direction === "left" && currentOffset.current >= containerSize)
                    currentOffset.current = -contentSize;
                if (direction === "right" && currentOffset.current <= -contentSize)
                    currentOffset.current = containerSize;
                container.style.transform = `translateX(${currentOffset.current}px)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();
    };

    useEffect(() => {
        const verticalDirection1 =
            direction1 === "left"
                ? "up"
                : direction1 === "right"
                ? "down"
                : direction1;
        const verticalDirection2 =
            direction2 === "left"
                ? "up"
                : direction2 === "right"
                ? "down"
                : direction2;
        const horizontalDirection1 =
            direction1 === "up"
                ? "left"
                : direction1 === "down"
                ? "right"
                : direction1;
        const horizontalDirection2 =
            direction2 === "up"
                ? "left"
                : direction2 === "down"
                ? "right"
                : direction2;

        startLoopScroll(
            container1Ref.current,
            isLargeScreen ? verticalDirection1 : horizontalDirection1,
            currentOffset1,
            animationRef1,
            isLargeScreen
        );
        startLoopScroll(
            container2Ref.current,
            isLargeScreen ? verticalDirection2 : horizontalDirection2,
            currentOffset2,
            animationRef2,
            isLargeScreen
        );

        const interval = setInterval(() => {
            if (isLargeScreen) {
                setDirection1((prev) => (prev === "up" ? "down" : "up"));
                setDirection2((prev) => (prev === "up" ? "down" : "up"));
            } else {
                setDirection1((prev) => (prev === "left" ? "right" : "left"));
                setDirection2((prev) => (prev === "right" ? "left" : "right"));
            }
        }, animationDuration * 1000);

        return () => {
            clearInterval(interval);
            if (animationRef1.current) cancelAnimationFrame(animationRef1.current);
            if (animationRef2.current) cancelAnimationFrame(animationRef2.current);
        };
    }, [direction1, direction2, isLargeScreen]);

    return (
        <section
            id="testimoni"
            className="section-padding-x pt-12 pb-12 dark:text-light-base text-light-base bg-dark-base lg:max-h-[512px] overflow-hidden scroll-mt-12 gradient-to-r from-dark-base to-sipil-secondary/10 dark:from-slate-900 dark:to-sipil-secondary/20 bg-gradient-to-br"
        >
            <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row justify-between gap-8">
                <div className="max-w-xl">
                    <p className="text-sipil-base">Testimoni Alumni</p>
                    <h2 className="font-bold mb-2">
                        Apa Kata Mereka yang Pernah Menjadi Bagian dari Teknik Sipil Unsoed?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-300 mb-4">
                        Teknik Sipil Unsoed memberikan pengalaman belajar yang luar biasa, 
                        membekali mahasiswa dengan ilmu dan keterampilan yang relevan di dunia kerja.
                    </p>
                    <a
                        href="#"
                        className="text-light-base gradient-to-r from-sipil-base to-sipil-secondary bg-gradient-to-br px-4 py-2 md:px-6 md:py-3 rounded-xl font-semibold small-font-size"
                    >
                        Pelajari Lebih Lanjut
                    </a>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div
                        className="flex flex-row-reverse lg:flex-col gap-4 w-full lg:w-auto"
                        ref={container1Ref}
                        style={{ whiteSpace: isLargeScreen ? "normal" : "nowrap" }}
                    >
                        {testimonials1.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                                isHorizontal={!isLargeScreen}
                            />
                        ))}
                    </div>
                    <div
                        className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto"
                        ref={container2Ref}
                        style={{ whiteSpace: isLargeScreen ? "normal" : "nowrap" }}
                    >
                        {testimonials2.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                                isHorizontal={!isLargeScreen}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const TestimonialCard = ({
    testimonial,
    isHorizontal,
}: {
    testimonial: Testimonial;
    isHorizontal?: boolean;
}) => (
    <div
        className={`flex ${
            isHorizontal ? "min-w-[300px]" : ""
        } flex-col gap-4 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-w-2xl relative group`}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
            className="w-8 absolute text-sipil-base top-4 right-4 opacity-50 group-hover:opacity-100 transition-all duration-300"
        >
            <path d="M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72z" />
        </svg>
        <p className="text-gray-900 dark:text-gray-100 small-font-size text-wrap">
            {testimonial.text}
        </p>
        <div className="flex flex-row gap-2">
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded-full"
            />
            <div className="flex flex-col">
                <p className="font-semibold text-dark-base dark:text-light-base small-font-size">
                    {testimonial.name}
                </p>
                <p className="text-gray-500 dark:text-gray-300 extra-small-font-size">
                    {testimonial.title}
                </p>
            </div>
        </div>
    </div>
);
