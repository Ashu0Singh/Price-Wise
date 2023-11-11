"use client";

import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { error } from "console";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, Fragment, useState } from "react";

const SearchProd = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [products, setProducts] = useState([
		{
			_id: "654e516f4a60434c48f02a2",
			title: "Samsung Galaxy S23 FE 5G (Graphite, 8GB, 128GB Storage)",
			category: "Smartphones",
			reviewCounts: "19",
			image: "https://m.media-amazon.com/images/I/71tK+6kbxGL._SL1500_.jpg",
		},
	]);
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await axios
			.post(`api/getSearchProds`, {
				searchString,
			})
			.then((res) => setProducts(res.data.products))
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<button onClick={openModal}>
				<Image
					src={"/assets/icons/search.svg"}
					alt={"Search"}
					width={28}
					height={28}
				/>
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
								<form
									className="dialog-input_container max-h-[55px] overflow-clip"
									onSubmit={handleSubmit}>
									<input
										type="text"
										className="dialog-input shrink"
										placeholder="Enter product name"
										value={searchString}
										onChange={(e) =>
											setSearchString(e.target.value)
										}
									/>
									<button type="submit">
										<Image
											src={"/assets/icons/search.svg"}
											alt={"Search"}
											width={36}
											height={36}
										/>
									</button>
								</form>
								<div className="no-scrollbar flex flex-col max-h-[200px] py-3 overflow-y-scroll gap-2 mx-auto">
									{products.map((product) => {
										return (
											<Link
												href={`/product/${product._id}`}
												key={product._id}
												onClick={() =>
													setTimeout(
														() => closeModal(),
														300
													)
												}
												className="flex max-h-[100px] flex-row px-2 gap-3 py-3 border-2 rounded-xl border-secondary/5">
												<div className="flex min-w-[70px]">
													<Image
														src={product.image}
														alt={product.title}
														width={100}
														height={100}
													/>
												</div>
												<div className="flex justify-between flex-col px-1 truncate">
													<h4 className="text-md font-semibold text-clip">
														{product.title}
													</h4>
													<div className="flex justify-between flex-row">
														<div className="text-slate-500 capitalize text-sm">
															{product.category}
														</div>
														<div className="text-sm font-semibold text-[#efa1a8]">
															{
																product.reviewCounts
															}
														</div>
													</div>
												</div>
											</Link>
										);
									})}
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default SearchProd;
