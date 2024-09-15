import React, { Dispatch, SetStateAction } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ITextInput {
    enable?: boolean;
    state: {
        current: string;
        setValue: Dispatch<SetStateAction<string>>;
    };
    type: string;
    label: string;
    placeholder?: string;
    regex?: RegExp;
    onChange?: any;
    onVisibilityChange?: any;
}

export default function TextInput({ enable = true, state, type, label, placeholder, regex, onChange, onVisibilityChange }: ITextInput) {
    const [isPasswordValue, setIsPasswordValue] = React.useState(false)

    const handleVisibilityChange = () => {
        setIsPasswordValue((prev) => !prev)
        if(onVisibilityChange){
            onVisibilityChange(!isPasswordValue)
        }
    }

    return (
        <label className={"flex flex-col text-white text-sm gap-2 my-2 relative"}>
            <p>
                {label} <span className="text-red-500">*</span>
            </p>
            <input
                disabled={!enable}
                onChange={onChange ? onChange : (event) => state.setValue(event.target.value)}
                value={state.current}
                className={"border-2 p-2 rounded-lg "}
                type={isPasswordValue ? "text": type}
                style={{
                    color: "black",
                    borderColor: state.current && regex && !regex.test(state.current) ? "red" : "",
                }}
                placeholder={placeholder}/>

            {type === "password" && (
                <div className={"absolute right-5 bottom-2 cursor-pointer"} onClick={handleVisibilityChange}>
                    {isPasswordValue ? <FaEyeSlash color={"#14263A"} size={20}/> : <FaEye color={"#14263A"} size={20}/>}
                </div>
                )}
        </label>
    );
}
