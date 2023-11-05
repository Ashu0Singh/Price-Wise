"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
	{ imgUrl: "/assets/images/hero-1.svg", alt: "Smartwatch" },
	{ imgUrl: "/assets/images/hero-2.svg", alt: "Bag" },
	{ imgUrl: "/assets/images/hero-3.svg", alt: "Lamp" },
	{ imgUrl: "/assets/images/hero-5.svg", alt: "Chair" },
];

const HeroCarousel = () => {
	return (
		<div className="hero-carousel mx-auto">
			<Carousel
				autoPlay
				infiniteLoop
				showThumbs={false}
				showStatus={false}
				showArrows={false}
                interval={2000}
            >
				{heroImages.map((image) => (
					<div key={image.alt}>
						<Image
							src={image.imgUrl}
							alt={image.alt}
							width={484}
							height={484}
							className="object-contain"
						/>
					</div>
				))}
			</Carousel>
			<Image
				src="/assets/icons/hand-drawn-arrow.svg"
				alt="Hand drawn arrow"
				width={175}
				height={175}
				className="max-xl:hidden absolute -left-[15%] -bottom-10 z-0"
			/>
		</div>
	);
};

export default HeroCarousel;
