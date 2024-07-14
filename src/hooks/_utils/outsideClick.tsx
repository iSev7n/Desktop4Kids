import { useRef, useEffect, memo, ReactNode } from "react";

/**
 * https://stackoverflow.com/a/42234988
 */

function useOutsideClickListener(ref: { current: HTMLElement | null }, callback: (event: Event) => void) {
	useEffect(() => {
		const handleClickOutside = (event: Event) => {
			if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
				callback(event);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, callback]);
}

interface OutsideClickListenerProps {
	onOutsideClick: (event: Event) => void;
	children: ReactNode;
}

export const OutsideClickListener = memo(({ onOutsideClick, children }: OutsideClickListenerProps) => {
	const wrapperRef = useRef(null);
	useOutsideClickListener(wrapperRef, onOutsideClick);

	return <div ref={wrapperRef}>{children}</div>;
});