import { Vector2 } from "../math/vector2";
import { WindowProps } from "../../components/windows/WindowView";
import { FC } from "react";

type AppCategory = 'Apps' | 'Utilities'| 'Games';  // Define AppCategory type

export class App {
  name: string = "App";
  id: string = "app";
  windowContent?: FC<JSX.IntrinsicAttributes & WindowProps>;
  windowOptions?: {
    size: Vector2;
    [key: string]: unknown;
  };
  isActive: boolean = false;
  isPinned?: boolean;
  category!: AppCategory;  // Use AppCategory type

  /**
   * @param windowOptions - Default window options
   */
  constructor(name: App["name"], id: App["id"], windowContent: App["windowContent"], windowOptions?: App["windowOptions"], category: AppCategory = 'Apps') {
    Object.assign(this, { name, id, windowContent, windowOptions, category });

    if (this.windowContent == null)
      console.warn(`${this.name} (${this.id}) is missing the windowContent property.`);
  }

  WindowContent = (props: JSX.IntrinsicAttributes & WindowProps) => {
    props = { ...props, ...this.windowOptions };

    if (this.windowContent == null) {
      return null;
    }

    return <this.windowContent {...props}/>;
  };
}
