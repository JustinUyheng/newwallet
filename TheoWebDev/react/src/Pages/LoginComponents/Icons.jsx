import React from "react";

const iconProps = {
	className: "input-icon",
	strokeWidth: "2",
	width: "20",
	height: "20",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
};

export const Eye = () => (
	<svg {...iconProps}>
		<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
		<circle cx="12" cy="12" r="3" />
	</svg>
);
export const EyeOff = () => (
	<svg {...iconProps}>
		<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
		<path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
		<path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
		<line x1="2" x2="22" y1="2" y2="22" />
	</svg>
);
export const Mail = () => (
	<svg {...iconProps}>
		<rect width="20" height="16" x="2" y="4" rx="2" />
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
	</svg>
);
export const Lock = () => (
	<svg {...iconProps}>
		<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
		<path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</svg>
);
export const User = () => (
	<svg {...iconProps}>
		<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</svg>
);
export const Phone = () => (
	<svg {...iconProps}>
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
	</svg>
);
export const KeyRound = () => (
	<svg {...iconProps}>
		<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
		<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
	</svg>
);
export const Bank = () => (
	<svg
		viewBox="0 0 1024 1024"
		class="icon"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		fill="#000000"
	>
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<path
				d="M511.8 154.1L916 277v45.7H108V277l403.8-122.9m0-46L64 244.4v122.3h896V244.4L511.8 108.1zM113 831.4h798v16H113z"
				fill="#39393A"
			></path>
			<path d="M113 391.1h798v16H113z" fill="#E73B37"></path>
			<path
				d="M64.3 871.8h895.3v44H64.3zM204.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM414.7 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM625.2 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44zM835.8 475.6v287.3h52v44h-120v-44h52V475.6h-52v-44h120v44z"
				fill="#39393A"
			></path>
		</g>
	</svg>
);
