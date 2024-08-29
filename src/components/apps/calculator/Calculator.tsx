import { useCallback, useEffect, useState } from "react";
import { Button } from "../../_utils/button/Button";
import styles from "./Calculator.module.css";
import { WindowProps } from "../../windows/WindowView";

export function Calculator({ active }: WindowProps) {
  const [input, setInput] = useState<string | null>("0");
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [secondNumber, setSecondNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [isIntermediate, setIsIntermediate] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const reset = useCallback(() => {
    setInput("0");
    setFirstNumber(null);
    setSecondNumber(null);
    setOperation(null);
  }, []);

  const addInput = useCallback(
    (inputStr: string) => {
      let hasReset = false;
      if (secondNumber !== null) {
        if (isIntermediate && input !== null) {
          setFirstNumber(parseFloat(input));
          setSecondNumber(null);
          setInput(null);
        } else {
          reset();
        }
        hasReset = true;
      }

      if (inputStr === "." && input?.includes(".")) return;

      switch (inputStr) {
        case "-":
          setInput((prev) => (prev === "0" ? "-0" : (parseFloat(prev!) * -1).toString()));
          break;
        case "%":
          setInput((prev) => (parseFloat(prev!) / 100).toString());
          break;
        default:
          setInput((prev) => {
            if (prev === "0" || prev === "-0" || prev === null || hasReset) {
              return inputStr === "." ? (prev === "-0" ? "-0." : "0.") : inputStr;
            }
            return prev + inputStr;
          });
          break;
      }
    },
    [input, isIntermediate, reset, secondNumber]
  );

  const calculate = useCallback(
    (intermediate = false) => {
      if (firstNumber !== null && input !== null) {
        setSecondNumber(parseFloat(input));
        const a = firstNumber;
        const b = parseFloat(input);

        const operationsMap: Record<string, (a: number, b: number) => number> = {
          "×": (a, b) => a * b,
          "÷": (a, b) => a / b,
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
        };
        
        const result = operationsMap[operation!](a, b);
        setInput(result.toString());

        // Update history with a max of 5 entries
        setHistory((prevHistory) => {
          const newHistory = `${a} ${operation} ${b} = ${result}`;
          const updatedHistory = [newHistory, ...prevHistory];
          return updatedHistory.slice(0, 100);
        });
      }
      setIsIntermediate(intermediate);
    },
    [firstNumber, input, operation]
  );

  const changeOperation = useCallback(
    (newOperation: string) => {
      if (firstNumber !== null && secondNumber === null) {
        calculate(true);
      } else if (input !== null) {
        setFirstNumber(parseFloat(input));
        setSecondNumber(null);
        setInput(null);
      }
      setOperation(newOperation);
    },
    [calculate, firstNumber, input, secondNumber]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!active) return;
      event.preventDefault();

      const keyMap: Record<string, () => void> = {
        "0": () => addInput("0"),
        "1": () => addInput("1"),
        "2": () => addInput("2"),
        "3": () => addInput("3"),
        "4": () => addInput("4"),
        "5": () => addInput("5"),
        "6": () => addInput("6"),
        "7": () => addInput("7"),
        "8": () => addInput("8"),
        "9": () => addInput("9"),
        ".": () => addInput("."),
        ",": () => addInput("."),
        "Escape": reset,
        "=": calculate,
        "Enter": calculate,
        "*": () => changeOperation("×"),
        "/": () => changeOperation("÷"),
        "+": () => changeOperation("+"),
        "-": () => changeOperation("-"),
        "%": () => addInput("%"),
      };

      const action = keyMap[event.key];
      if (action) {
        action();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, addInput, calculate, changeOperation, reset]);

  const calculation = operation !== null
    ? `${firstNumber} ${operation} ${secondNumber !== null ? secondNumber + " =" : ""}`
    : "";

  return (
    <div className={styles.Calculator}>
      <div className={styles.MainContent}>
        <div className={styles.Output}>
          <p className={styles.Calculation}>{calculation}</p>
          <p className={styles.Preview}>{input ?? firstNumber}</p>
        </div>
        <div className={styles.Input}>
          <div className={styles.InputRow}>
            <Button className={styles.Button} onClick={reset}>C</Button>
            <Button className={styles.Button} onClick={() => addInput("-")}>+/-</Button>
            <Button className={styles.Button} onClick={() => addInput("%")}>%</Button>
            <Button className={styles.Button} onClick={() => changeOperation("÷")}>÷</Button>
          </div>
          <div className={styles.InputRow}>
            <Button className={styles.Button} onClick={() => addInput("7")}>7</Button>
            <Button className={styles.Button} onClick={() => addInput("8")}>8</Button>
            <Button className={styles.Button} onClick={() => addInput("9")}>9</Button>
            <Button className={styles.Button} onClick={() => changeOperation("×")}>×</Button>
          </div>
          <div className={styles.InputRow}>
            <Button className={styles.Button} onClick={() => addInput("4")}>4</Button>
            <Button className={styles.Button} onClick={() => addInput("5")}>5</Button>
            <Button className={styles.Button} onClick={() => addInput("6")}>6</Button>
            <Button className={styles.Button} onClick={() => changeOperation("-")}>-</Button>
          </div>
          <div className={styles.InputRow}>
            <Button className={styles.Button} onClick={() => addInput("1")}>1</Button>
            <Button className={styles.Button} onClick={() => addInput("2")}>2</Button>
            <Button className={styles.Button} onClick={() => addInput("3")}>3</Button>
            <Button className={styles.Button} onClick={() => changeOperation("+")}>+</Button>
          </div>
          <div className={styles.InputRow}>
            <Button className={`${styles.Button} ${styles.ButtonLarge}`} onClick={() => addInput("0")}>0</Button>
            <Button className={styles.Button} onClick={() => addInput(".")}>.</Button>
            <Button className={styles.Button} onClick={calculate}>=</Button>
          </div>
        </div>
      </div>
      <div className={styles.History}>
        <h3>History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
