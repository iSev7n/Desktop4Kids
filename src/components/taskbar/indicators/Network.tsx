import { faWifi, faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";
import styles from "./Network.module.css";

interface NetworkProps {
	hideUtilMenus: boolean;
	showUtilMenu: Function;
}

interface WifiNetwork {
	ssid: string;
	signalStrength: number; // Percentage from 0 to 100
	connected: boolean;
}

export function Network({ hideUtilMenus, showUtilMenu }: NetworkProps) {
	const [showMenu, setShowMenu] = useState(false);
	const [networks, setNetworks] = useState<WifiNetwork[]>([]);
	const [currentNetwork, setCurrentNetwork] = useState<WifiNetwork | null>(null);

	useEffect(() => {
		if (hideUtilMenus && showMenu) {
			setShowMenu(false);
		}
	}, [hideUtilMenus, showMenu]);

	useEffect(() => {
		// Simulate fetching Wi-Fi networks
		const mockNetworks = [
			{ ssid: 'Home_WiFi', signalStrength: 80, connected: true },
			{ ssid: 'Office_WiFi', signalStrength: 60, connected: false },
			{ ssid: 'Cafe_WiFi', signalStrength: 40, connected: false },
		];

		setNetworks(mockNetworks);
		setCurrentNetwork(mockNetworks.find(network => network.connected) || null);
	}, []);

	const updateShowMenu = (show: boolean) => {
		if (show)
			showUtilMenu();

		setShowMenu(show);
	};

	return (
		<OutsideClickListener onOutsideClick={() => { updateShowMenu(false); }}>
			<button title="Network" tabIndex={0} onClick={() => { updateShowMenu(!showMenu); }}>
				<FontAwesomeIcon icon={faWifi} />
			</button>
			{showMenu && (
				<UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
					{currentNetwork && (
						<div className={styles.currentNetwork}>
							<FontAwesomeIcon icon={faWifi} />
							<p>Connected to {currentNetwork.ssid}</p>
						</div>
					)}
					<div className={styles.networksList}>
						{networks.map((network, index) => (
							<div key={index} className={styles.network}>
								<FontAwesomeIcon icon={faSignal} />
								<p>{network.ssid}</p>
								<p>{network.signalStrength}%</p>
							</div>
						))}
					</div>
				</UtilMenu>
			)}
		</OutsideClickListener>
	);
}
