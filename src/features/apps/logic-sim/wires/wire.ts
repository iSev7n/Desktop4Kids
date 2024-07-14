import { WIRE } from "../../../../config/apps/logicSim.config";
import { Vector2 } from "../../../math/vector2";
import { Circuit } from "../core/circuit";
import { Pin } from "../pins/pin";
import { State } from "../_utils/state";

export interface WireJson {
	color: string;
	inputId: number;
	outputId: number;
	anchorPoints: {
		x: number;
		y: number;
	}[];
}

export class Wire {
	color!: string;
	state = State.LOW;
	inputPin!: Pin;
	outputPin!: Pin;
	anchorPoints!: Vector2[];
	circuit!: Circuit;
	placedBackwards = false;

	constructor(circuit: Circuit, color: string, inputPin?: Pin, outputPin?: Pin, anchorPoints?: Vector2[]) {
		Object.assign(this, { circuit, color, inputPin, outputPin, anchorPoints });
	}

	setState(state: State) {
		if (this.state.isEqual(state))
			return;

		this.state = state;
		this.update();
	}

	update() {
		if (this.outputPin == null)
			return;

		this.outputPin.setState(this.state);
	}

	draw(isPlacing: boolean) {
		const positions = [...this.anchorPoints];

		if (this.inputPin != null) {
			if (!this.placedBackwards) {
				positions.unshift(this.inputPin.position);
			} else {
				positions.push(this.inputPin.position);
			}
		}
		
		if (this.outputPin != null) {
			if (!this.placedBackwards) {
				positions.push(this.outputPin.position);
			} else {
				positions.unshift(this.outputPin.position);
			}
		}

		let color: string;

		if (isPlacing) {
			color = `${this.color}-2`;
		} else if (this.state.value === 1) {
			color = `${this.color}-0`;
		} else {
			color = `${this.color}-2`;
		}

		this.circuit.drawCurvedLine(this.circuit.getColor(color), positions, WIRE.width, WIRE.cornerRadius, WIRE.resolution);
	}

	toJson() {
		const object = {
			color: this.color
		} as WireJson;

		if (this.inputPin != null)
			object.inputId = this.inputPin.id;

		if (this.outputPin != null)
			object.outputId = this.outputPin.id;

		if (this.anchorPoints != null)
			object.anchorPoints = this.anchorPoints;

		return object;
	}
}