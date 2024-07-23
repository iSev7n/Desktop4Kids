// AboutSettings.tsx
import { useEffect, useState } from "react";
import { Button } from "../../../_utils/button/Button";
import styles from "../Settings.module.css";
import utilStyles from "../../../../styles/utils.module.css";
import { Vector2 } from "../../../../features/math/vector2";
import { useWindowsManager } from "../../../../hooks/windows/windowsManagerContext";
import { useVirtualRoot } from "../../../../hooks/virtual-drive/virtualRootContext";
import { NAME } from "../../../../config/branding.config";

export function AboutSettings() {
	const windowsManager = useWindowsManager();
	const virtualRoot = useVirtualRoot();
	const [error, setError] = useState<string | null>(null);

	const handleOpenInfo = (event: Event) => {
		event.preventDefault();
		try {
			windowsManager?.open("text-editor", {
				mode: "view",
				file: virtualRoot?.navigate("~/Documents/Info.md"),
				size: new Vector2(575, 675),
			});
		} catch (e) {
			setError("Failed to open Info.md");
		}
	};

	return (
		<div className={styles.Option}>
			<p className={styles.Label}>About {NAME}</p>
			<p className={utilStyles.TextLight}>
				{NAME} is a kids operating system inspired by Ubuntu Linux and Windows made with React.js.
			</p>
			<p className={utilStyles.TextLight}>Version: 1.0</p>
			{error && <p className={utilStyles.TextError}>{error}</p>}
			<div className={styles.ButtonGroup}>
				<Button className={`${styles.Button} ${utilStyles.TextBold}`} onClick={handleOpenInfo}>
					Open Info.md
				</Button>
				<Button className={`${styles.Button} ${utilStyles.TextBold}`} href="https://github.com/iSev7n/Desktop4Kids">
					View source
				</Button>
			</div>
		</div>
	);
}
