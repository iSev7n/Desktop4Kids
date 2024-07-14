import { createContext, useContext } from "react";
import { ModalsManager } from "../../features/modals/modalsManager";

type ModalsManagerState = ModalsManager | undefined;

export const modalsManagerContext = createContext<ModalsManagerState>(undefined);

export function useModalsManager(): ModalsManagerState {
	return useContext(modalsManagerContext);
}