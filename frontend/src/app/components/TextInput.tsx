import { Dispatch, SetStateAction } from "react";

interface ITextInput {
    enable?: boolean;
    state: {
        current: string;
        setValue: Dispatch<SetStateAction<string>>;
    };
    type: string;
    label: string;
    regex?: RegExp;
    onChange?: any;
}

export default function TextInput({ enable = true, state, type, label, regex, onChange }: ITextInput) {
    return (
        <label className={"flex flex-col text-yellow-600 text-sm gap-2 my-2"}>
            <p>
                {label} <span className="text-red-500">*</span>
            </p>
            <input
                disabled={!enable}
                onChange={onChange ? onChange : (event) => state.setValue(event.target.value)}
                value={state.current}
                className={"border-2 p-2 rounded-lg"}
                type={type}
                style={{
                    color: "black", // Define a cor do texto como preto
                    borderColor: regex && !regex.test(state.current) ? "red" : "", // Ajusta a cor da borda se o regex não for atendido
                }}
            />
        </label>
    );
}
