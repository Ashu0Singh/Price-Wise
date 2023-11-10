"use client";
import Image from "next/image";
import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Spinner from "./Spinner";
import { addUserEmailToProduct } from "@/lib/actions";
import toast from "react-hot-toast";

interface props {
	productId: String;
}

const TrackPrice = ({ productId }: props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			await addUserEmailToProduct(productId, email);
			closeModal();
		} catch (error: any) {
			console.log(error.message);
			toast.error("Internal Error");
		} finally {
			setIsSubmitting(false);
		}
	};

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);
	return (
		<div className="grow min-w-[200px]">
			<button
				type="button"
				className="btn bg-secondary w-full mx-auto flex items-center justify-center gap-3 min-w-[200px]"
				onClick={openModal}>
				<Image
					src="/assets/icons/bag.svg"
					alt="Buy Now"
					width={22}
					height={22}
				/>
				<p className="text-base text-white">Track Price</p>
			</button>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="dialog-container"
					onClose={closeModal}>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						/>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<div className="dialog-content">
								<div className="flex flex-col">
									<div className="flex justify-between">
										<div className="p-3 border border-gray-200 rounded-md">
											<Image
												src="/assets/icons/logo.svg"
												alt="Logo"
												width={28}
												height={28}
											/>
										</div>
										<Image
											src="/assets/icons/x-close.svg"
											alt="Logo"
											width={24}
											height={24}
											className="cursor-pointer"
											onClick={closeModal}
										/>
									</div>
									<h4 className="dialog-head_text">
										Stay updated with product pricing alert
										right in your inbox.
									</h4>
									<p className="text-sm text-gray-600 mt-2">
										Never miss a bragain again with our
										timely alert.
									</p>
									<form
										className="flex flex-col mt-5"
										onSubmit={handleSubmit}>
										<label
											htmlFor="email"
											className="text-sm font-medium text-gray-700">
											Email Address
										</label>
										<div className="dialog-input_container">
											<Image
												src="/assets/icons/mail.svg"
												alt="Email"
												width={18}
												height={18}
											/>
											<input
												required
												type="email"
												id="email"
												value={email}
												onChange={(e) =>
													setEmail(e.target.value)
												}
												placeholder="Enter your email"
												className="dialog-input"
											/>
										</div>
										<button
											type="submit"
											className="dialog-btn">
											{isSubmitting ? (
												<Spinner text="Submitting" />
											) : (
												"Track"
											)}
										</button>
									</form>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default TrackPrice;
