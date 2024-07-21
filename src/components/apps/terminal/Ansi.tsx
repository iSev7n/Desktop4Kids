import Anser, { AnserJsonEntry } from "anser";
import { escapeCarriageReturn } from "escape-carriage";
import * as React from "react";
import styles from "./Terminal.module.css";

function ansiToJSON(input: string, use_classes: boolean | undefined): AnserJsonEntry[] {
    input = escapeCarriageReturn(fixBackspace(input));
    return Anser.ansiToJson(input, {
        json: true,
        remove_empty: true,
        use_classes,
    });
}

function createClass(bundle: AnserJsonEntry): string | null {
    const classNames = [];
    if (bundle.bg) classNames.push(styles[`${bundle.bg}-bg`]);
    if (bundle.fg) classNames.push(styles[`${bundle.fg}-fg`]);
    if (bundle.decoration) classNames.push(styles[`ansi-${bundle.decoration}`]);
    if (classNames.length === 0) return null;
    return classNames.join(" ");
}

function createStyle(bundle: AnserJsonEntry): object {
    const style: Record<string, string> = {};
    if (bundle.bg) style.backgroundColor = `rgb(${bundle.bg})`;
    if (bundle.fg) style.color = `rgb(${bundle.fg})`;
    switch (bundle.decoration) {
        case "bold":
            style.fontWeight = "bold";
            break;
        case "dim":
            style.opacity = "0.5";
            break;
        case "italic":
            style.fontStyle = "italic";
            break;
        case "hidden":
            style.visibility = "hidden";
            break;
        case "strikethrough":
            style.textDecoration = "line-through";
            break;
        case "underline":
            style.textDecoration = "underline";
            break;
        case "blink":
            style.textDecoration = "blink";
            break;
        default:
            break;
    }
    return style;
}

function convertBundleIntoReact(linkify: boolean, useClasses: boolean, bundle: AnserJsonEntry, key: number) {
    const style = useClasses ? null : createStyle(bundle);
    const className = useClasses ? createClass(bundle) : null;
    if (!linkify) {
        return React.createElement("pre", { style, key, className }, bundle.content);
    }

    const content = [];
    const linkRegex = /(\s|^)(https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;
    let index = 0;
    let match: RegExpExecArray | null;
    while ((match = linkRegex.exec(bundle.content)) !== null) {
        const [, pre, url] = match;
        const startIndex = match.index + pre.length;
        if (startIndex > index) {
            content.push(bundle.content.substring(index, startIndex));
        }
        const href = url.startsWith("www.") ? `http://${url}` : url;
        content.push(React.createElement("a", { key: index, href, target: "_blank" }, `${url}`));
        index = linkRegex.lastIndex;
    }
    if (index < bundle.content.length) {
        content.push(bundle.content.substring(index));
    }
    return React.createElement("span", { style, key, className }, content);
}

export function Ansi(props: { children?: string | undefined; linkify?: boolean | undefined; className?: string | undefined; useClasses?: boolean | undefined; }) {
    const { className, useClasses, children, linkify } = props;
    return React.createElement(
        "code",
        { className },
        ansiToJSON(children ?? "", useClasses ?? false).map(
            convertBundleIntoReact.bind(null, linkify ?? false, useClasses ?? false)
        )
    );
}

function fixBackspace(txt: string) {
    let tmp = txt;
    do {
        txt = tmp;
        tmp = txt.replace(/[^\n]\x08/gm, "");
    } while (tmp.length < txt.length);
    return txt;
}
