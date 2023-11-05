import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Price Wise",
	description:
		"Price Wise helps you track product prices effortlessly and save money on your online purchases.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="no-scrollbar">
			<body className={inter.className}>
				<main className="max-w-10xl mx-auto">
					<Toaster />
					<Analytics />
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
