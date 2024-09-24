import React from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

interface IArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick: () => void
}

export function NextArrow(props: IArrowProps) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                background: "#4A9EFF",
                borderRadius: 100,
                padding: "10px",
                width: "39px",
                height: "39px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <FaArrowCircleRight />
        </div>
    );
}

export function PrevArrow(props: IArrowProps) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                background: "#4A9EFF",
                borderRadius: 100,
                padding: "10px",
                width: "39px",
                height: "39px",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
            onClick={onClick}
        >
            <FaArrowCircleLeft />
        </div>
    );
}