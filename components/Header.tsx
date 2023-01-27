import { useRouter } from "next/router";
import React from "react";

type Props = {
	title: string;
};

const Header = ({ title }: Props) => {
	const router = useRouter();

	return (
		<div className="flex justify-between h-16 mb-4">
			<h2 className="m-4 text-4xl font-bold text-gray-900">{title}</h2>
			<button
				onClick={() => router.push("/")}
				className="mx-4 text-xl font-bold text-white"
			>
				Home
			</button>
		</div>
	);
};

export default Header;
