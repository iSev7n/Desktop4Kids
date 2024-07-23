import { ChangeEventHandler, useEffect, useState } from "react";
import { SettingsManager } from "../../../../features/settings/settingsManager";
import styles from "../Settings.module.css";
import utilStyles from "../../../../styles/utils.module.css";
import { useVirtualRoot } from "../../../../hooks/virtual-drive/virtualRootContext";
import { useSettingsManager } from "../../../../hooks/settings/settingsManagerContext";
import { WALLPAPERS_PATH } from "../../../../config/apps/settings.config";
import { useWindowedModal } from "../../../../hooks/modals/windowedModal";
import { Button } from "../../../_utils/button/Button";
import { FileSelector } from "../../../modals/file-selector/FileSelector";
import { SELECTOR_MODE } from "../../../../config/apps/fileExplorer.config";
import { DEFAULT_FILE_SELECTOR_SIZE } from "../../../../config/modals.config";
import { IMAGE_FORMATS } from "../../../../config/apps/mediaViewer.config";
import { VirtualFile } from "../../../../features/virtual-drive/file";
import { VirtualFolder } from "../../../../features/virtual-drive/folder/virtualFolder";
import { THEMES } from "../../../../config/themes.config";

export function AppearanceSettings() {
	const virtualRoot = useVirtualRoot();
	const settingsManager = useSettingsManager();
	const [theme, setTheme] = useState(0);
	const [wallpaper, setWallpaper] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const desktopSettings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.desktop);
	const themeSettings = settingsManager?.getSettings(SettingsManager.VIRTUAL_PATHS.theme);
	const { openWindowedModal } = useWindowedModal();

	useEffect(() => {
		const loadSettings = async () => {
			try {
				const wallpaperValue = await desktopSettings?.get("wallpaper");
				const themeValue = await themeSettings?.get("theme");
				setWallpaper(wallpaperValue ?? null);
				setTheme(parseInt(themeValue ?? "0"));
			} catch (e) {
				setError("Failed to load settings");
			} finally {
				setLoading(false);
			}
		};
		loadSettings();
	}, [desktopSettings, themeSettings]);

	const onWallpaperChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		void desktopSettings?.set("wallpaper", value);
		setWallpaper(value);
	};

	const onThemeChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		void themeSettings?.set("theme", value);
		setTheme(parseInt(value));
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p className={utilStyles.TextError}>{error}</p>;
	}

	return (
		<>
			<div className={styles.Option}>
				<p className={styles.Label}>Theme</p>
				<div className={styles.Input}>
					<select className={styles.Dropdown} aria-label="theme" value={theme} onChange={onThemeChange as unknown as ChangeEventHandler}>
						{Object.entries(THEMES).map(([key, value]) => (
							<option key={key} value={key}>
								{value}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className={styles.Option}>
				<p className={styles.Label}>Wallpaper</p>
				<Button
					className={`${styles.Button} ${utilStyles.TextBold}`}
					onClick={() => {
						openWindowedModal({
							size: DEFAULT_FILE_SELECTOR_SIZE,
							Modal: (props: object) => (
								<FileSelector
									type={SELECTOR_MODE.SINGLE}
									allowedFormats={IMAGE_FORMATS}
									onFinish={(file) => {
										if ((file as VirtualFile).source != null) {
											const source = (file as VirtualFile).source as string;
											void desktopSettings?.set("wallpaper", source);
											setWallpaper(source);
										}
									}}
									{...props}
								/>
							),
						});
					}}
				>
					Browse
				</Button>
				<div className={`${styles.Input} ${styles.ImageSelectContainer}`}>
					{(virtualRoot?.navigate(WALLPAPERS_PATH) as VirtualFolder)?.getFiles()?.map(({ id, source }) => (
						<label className={styles.ImageSelect} key={id}>
							<input
								type="radio"
								value={source ?? ""}
								aria-label="Wallpaper image"
								checked={source === wallpaper}
								onChange={onWallpaperChange as unknown as ChangeEventHandler}
								tabIndex={0}
							/>
							<img src={source ?? ""} alt={id} draggable="false" />
						</label>
					))}
				</div>
			</div>
		</>
	);
}
