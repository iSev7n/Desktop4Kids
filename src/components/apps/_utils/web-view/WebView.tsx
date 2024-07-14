import React, { FC, forwardRef, useEffect, useState, HTMLProps } from "react";
import styles from "./WebView.module.css";
import { WindowProps } from "../../../windows/WindowView";

interface WebViewProps extends WindowProps {
    source?: string;
    title?: string;
}

type IframeProps = Omit<HTMLProps<HTMLIFrameElement>, keyof WebViewProps>;

export const WebView: FC<WebViewProps> = forwardRef<HTMLIFrameElement, WebViewProps>(
    ({ source, focus, setTitle, setIconUrl, active, standalone, close, ...rest }: WebViewProps, ref) => {
        const [hovered, setHovered] = useState(false);

        useEffect(() => {
            window.focus();

            const onBlur = (event: Event) => {
                if (hovered) {
                    focus?.(event);
                }
            };

            window.addEventListener("blur", onBlur);

            return () => {
                window.removeEventListener("blur", onBlur);
            };
        }, [focus, hovered]);

        const onMouseOver = () => {
            setHovered(true);
        };

        const onMouseOut = () => {
            window.focus();
            setHovered(false);
        };

        const iframeProps: IframeProps = {
            ref,
            src: source,
            referrerPolicy: "no-referrer",
            sandbox:
                "allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts",
            ...rest,
        };

        return (
            <div className={styles.WebView} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                <iframe {...iframeProps} />
            </div>
        );
    }
);

export default WebView;


