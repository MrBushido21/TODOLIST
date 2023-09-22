import { TextField } from "@mui/material";
import { KeyboardEvent, useState, } from "react";

type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}
const EditSpan = ({title, onChange}: PropsType) => {
    const [isInput, setIsInput] = useState<boolean>(false)
    const [titleTask, setTitle] = useState<string>("")

    const changeTitle = () => {
        setIsInput(true)
        setTitle(title)
    }

    const setNewTitle = () => {
        setIsInput(false)
        onChange(titleTask)
    }

    const addItemOnPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setNewTitle()
        }
    }

    return (
        <>
            {isInput
                ? <TextField
                 type="text"
                 variant="standard"
                 value={titleTask}
                 onChange={(e) => setTitle(e.currentTarget.value)}
                 autoFocus
                 onKeyPress={addItemOnPressEnter}
                 onBlur={setNewTitle}
                  />
                : <span className="li-span" onDoubleClick={changeTitle}>{title}</span>
            }
        </>
    );
}
export default EditSpan;