import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";
import styles from "./Volume.module.css";

interface VolumeProps {
	hideUtilMenus: boolean;
	showUtilMenu: Function;
}

export function Volume({ hideUtilMenus, showUtilMenu }: VolumeProps) {
	const [showMenu, setShowMenu] = useState(false);
	const [volume, setVolume] = useState(100);

	useEffect(() => {
		if (hideUtilMenus && showMenu) {
			setShowMenu(false);
		}
	}, [hideUtilMenus, showMenu]);

	const updateShowMenu = (show: boolean) => {
		if (show) showUtilMenu();
		setShowMenu(show);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseInt(e.target.value);
		setVolume(newVolume);

		// Adjust the volume of media elements (if any)
		const mediaElements = document.querySelectorAll("audio, video");
		mediaElements.forEach((mediaElement) => {
			(mediaElement as HTMLMediaElement).volume = newVolume / 100;
		});
	};

	return (
		<OutsideClickListener onOutsideClick={() => { updateShowMenu(false); }}>
			<button title="Volume" tabIndex={0} onClick={() => { updateShowMenu(!showMenu); }}>
				<FontAwesomeIcon icon={faVolumeHigh} />
			</button>
			<UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
				<div>
					<FontAwesomeIcon icon={faVolumeHigh} />
					<p>{volume}%</p>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					value={volume}
					onChange={handleVolumeChange}
					className={styles.slider}
				/>
			</UtilMenu>
		</OutsideClickListener>
	);
}