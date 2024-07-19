/* eslint-disable @typescript-eslint/indent */
import React, { useState } from "react";
import { DialogBox } from "../../modals/dialog-box/DialogBox";
import { ClickAction } from "../../actions/actions/ClickAction";
import { Vector2 } from "../../../features/math/vector2";
import styles from "./TextEditor.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";



const FindReplaceDialog = ({ selectedText, onClose, onFind, onFindAll, onReplace, onNext, onReset, onPrevious, onReplaceAll }: {
    selectedText: string;
    onClose: () => void;
    onFind: (text: string) => void;
    onFindAll: (text: string) => void;
    onReplace: (findText: string, replaceText: string) => void;
    onReplaceAll: (findText: string, replaceText: string) => void;
    onNext:()=>void;
    onPrevious:()=>void;
    onReset:()=>void;

}) => {
    const [findText, setFindText] = useState(selectedText);
    const [replaceText, setReplaceText] = useState("");

    const handleFind = () => {
        onFind(findText);
    };

    
    const handleFindAll = () => {
        onFindAll(findText);
    };

    const handleReplace = () => {
        onReplace(findText, replaceText);
    };

    const handleReplaceAll = () => {
        onReplaceAll(findText, replaceText);
    };
    
    const handleNext = () => {
        onNext();
        handleFindAll();
    };
    const handlePrevious = () => {
        onPrevious();
        handleFindAll();
    };
    const handleReset = () => {
        onReset();
    };

    return (
        <DialogBox
            title="Find and replace"
            size={new Vector2(800, 800)}
            onFinish={onClose}
        >
            <div className={styles.flex + " " + styles.flex_cols + " " + styles.items_start} >
                <div className={styles.flex + " " + styles.items_start} >
                    <label className={styles.flex + " " + styles.flex_cols + " " + styles.items_start}>
                        Find:
                        <div className={styles.flex + " " + styles.items_start} >
                            <input
                                className={styles.Input + " " + styles.space_y_3}
                                type="text"
                                value={findText}
                                onChange={(e) => {setFindText(e.target.value);handleReset();}}
                            />
                            <button onClick={handleFind}>Find</button>
                            <div className={styles.flex}>
                                <button onClick={handleNext}>
                                    <FontAwesomeIcon icon={faUpLong}/>
                                </button>
                                <button onClick={handlePrevious}>
                                    <FontAwesomeIcon icon={faUpLong} flip="vertical"/>
                                </button>
                            </div>
                        </div>
                    </label>
                </div>
                <div className={styles.flex + " " + styles.items_start} >
                    <label className={styles.flex + " " + styles.flex_cols + " " + styles.items_start}>
                        Replace with:
                        <div className={styles.flex + " " + styles.items_start} >
                            <input
                                type="text"
                                className={styles.Input}
                                value={replaceText}
                                onChange={(e) => {setReplaceText(e.target.value);}}
                            />
                            <button onClick={handleReplace}>Replace</button>
                            <button onClick={handleReplaceAll}>Replace All</button>
                        </div>
                    </label>
                </div>
            </div>
        </DialogBox>
    );
};

export default FindReplaceDialog;
