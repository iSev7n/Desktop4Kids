import { useEffect, useState } from "react";
import { App } from "../../features/apps/app";
import { VirtualFolder } from "../../features/virtual-drive/folder";
import { useVirtualRoot } from "../virtual-drive/virtualRootContext";

export function useAppFolder(app?: App): VirtualFolder | null {
	const virtualRoot = useVirtualRoot();
	const [folder, setFolder] = useState<VirtualFolder | null>(null);

	useEffect(() => {
		if (folder != null)
			return;

		const parentFolder = virtualRoot?.navigate("~/Apps") as VirtualFolder;

		if (parentFolder == null) {
			console.warn("Folder missing: '~/Apps'");
			return;
		}

		if (app == null)
			return;

		parentFolder.createFolder(app.id, (newFolder) => {
			setFolder(newFolder);
		});
	}, [virtualRoot]);

	return folder;
}