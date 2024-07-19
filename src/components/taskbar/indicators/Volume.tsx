import { faVolumeHigh, faVolumeMute, faVolumeLow, faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";
import styles from "./Volume.module.css";

interface VolumeProps {
	hideUtilMenus: boolean;
	showUtilMenu: Function;
}

export function Volume({ hideUtilMenus, showUtilMenu }: VolumeProps) {
	const [showMenu, setShowMenu] = useState(false);
	const [volume, setVolume] = useState(() => {
		const savedVolume = localStorage.getItem('volume');
		return savedVolume !== null ? parseInt(savedVolume) : 100;
	});
	const [isMuted, setIsMuted] = useState(false);
	const audioContextRef = useRef<AudioContext | null>(null);

	useEffect(() => {
		if (hideUtilMenus && showMenu) {
			setShowMenu(false);
		}
	}, [hideUtilMenus, showMenu]);

	useEffect(() => {
		const mediaElements = document.querySelectorAll("audio, video");
		mediaElements.forEach((mediaElement) => {
			(mediaElement as HTMLMediaElement).volume = volume / 100;
			(mediaElement as HTMLMediaElement).muted = isMuted;
		});
		localStorage.setItem('volume', volume.toString());
	}, [volume, isMuted]);

	const updateShowMenu = (show: boolean) => {
		if (show) showUtilMenu();
		setShowMenu(show);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVolume(parseInt(e.target.value));
		if (!isMuted) {
			playBeep();
		}
	};

	const toggleMute = () => {
		setIsMuted(!isMuted);
		if (!isMuted) {
			playBeep();
		}
	};

	const getVolumeIcon = () => {
		if (isMuted || volume === 0) {
			return faVolumeMute;
		} else if (volume <= 33) {
			return faVolumeDown;
		} else if (volume <= 66) {
			return faVolumeLow;
		} else {
			return faVolumeHigh;
		}
	};

	const playBeep = () => {
		if (!audioContextRef.current) {
			audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
		}
		const ctx = audioContextRef.current;
		const oscillator = ctx.createOscillator();
		const gainNode = ctx.createGain();
		oscillator.connect(gainNode);
		gainNode.connect(ctx.destination);
		
		// Customize the beep sound here
		oscillator.type = "sine"; // Waveform type: sine, square, sawtooth, triangle
		oscillator.frequency.setValueAtTime(380, ctx.currentTime); // Frequency in Hz
		gainNode.gain.setValueAtTime(volume / 100, ctx.currentTime); // Adjust gain based on volume
		
		oscillator.start();
		gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2); // Duration of the beep
		oscillator.stop(ctx.currentTime + 0.2);
	};

	return (
		<OutsideClickListener onOutsideClick={() => { updateShowMenu(false); }}>
			<button
				className={styles.volumeButton}
				title="Volume"
				tabIndex={0}
				onClick={() => { updateShowMenu(!showMenu); }}
			>
				<FontAwesomeIcon icon={getVolumeIcon()} />
			</button>
			{showMenu && (
				<UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
					<div>
						<FontAwesomeIcon icon={getVolumeIcon()} />
						<p>{isMuted ? 'Muted' : `${volume}%`}</p>
					</div>
					<input
						type="range"
						min="0"
						max="100"
						value={volume}
						onChange={handleVolumeChange}
						className={styles.slider}
						aria-label="Volume"
					/>
					<button
						className={styles.volumeButton}
						onClick={toggleMute}
					>
						{isMuted ? 'Unmute' : 'Mute'}
					</button>
				</UtilMenu>
			)}
		</OutsideClickListener>
	);
}