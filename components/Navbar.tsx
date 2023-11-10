import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchProd from "./SearchProd";

const NavIcons = [
	{ src: "/assets/icons/black-heart.svg", alt: "Wishlist" },
	{ src: "/assets/icons/user.svg", alt: "Profile" },
];

const Navbar = () => {
	return (
		<header className="w-full">
			<nav className="nav">
				<Link href="/" className="flex items-center gap-1">
					<Image
						src="/assets/icons/logo.svg"
						width={27}
						height={27}
						alt="logo"
					/>
					<p className="nav-logo">
						Price<span className="text-primary">Wise</span>
					</p>
				</Link>
				<div className="flex item-center gap-5">
					<SearchProd />
					{NavIcons.map((icon) => (
						<Image
							key={icon.alt}
							src={icon.src}
							alt={icon.alt}
							width={28}
							height={28}
						/>
					))}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
