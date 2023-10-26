import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
		<html lang="en">
			<body className={inter.className}>
				<main className="max-w-10xl mx-auto">
					<Navbar />
					{children}
				</main>
			</body>
		</html>
	);
}
