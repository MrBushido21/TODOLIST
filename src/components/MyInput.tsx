import { AddCircleOutline } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import PlusIcon from "@mui/material"
import { KeyboardEvent, useState } from "react"

type PropsType = {
    addItem: (title: string) => void
}
const MyInput = ({
    addItem
}: PropsType) => {

        const [inputValue, setInputValue] = useState<string>('')
        const [error, setError] = useState<string>("")

        const onClickaddItem = (title: string) => {
            if (inputValue) {
                addItem(title)
                setInputValue("")
            } else {
                setError("Title is required!!!")
            }
        }

        const addItemOnPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.charCode === 13) {
                addItem(inputValue)
                setInputValue("")
            }
        }

    return (
        <div>
            <TextField
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                onKeyPress={addItemOnPressEnter}
                error={!!error}
                helperText={error}
                onFocus={() => setError("")}
                variant="standard"
                label="Typed text..."
            />
            <IconButton onClick={() => onClickaddItem(inputValue)}>
                <AddCircleOutline />
            </IconButton>
        </div>
    );
}
export default MyInput;