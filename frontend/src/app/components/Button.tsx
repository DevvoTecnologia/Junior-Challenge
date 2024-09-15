import {ReactNode} from "react";


interface IButton {
    enable?: boolean,
    color: string,
    label: string | ReactNode,
    onClick: () => void,
    border?: boolean,
    textColor?: string,
    style?: string,
    disabled?: boolean
}

export default function Button({
                                   enable = true,
                                   color,
                                   label,
                                   onClick,
                                   border,
                                   textColor = "white",
                                   style,
                                   disabled
                               }: IButton) {
    return (
        <button
            disabled={!enable}
            className={`font-light text-sm py-3 px-6 rounded-lg shadow w-44 ${border ? "border-2" : ""} ${style}`}
            style={{backgroundColor: color, color: textColor}}
            onClick={onClick}
        >
            {label}
        </button>
    );
}
