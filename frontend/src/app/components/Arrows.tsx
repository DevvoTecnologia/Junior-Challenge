import React from "react";

export function NextArrow(props: { className: string; style: React.CSSProperties; onClick: () => void }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "#4A9EFF",
                borderRadius: "10px",
                padding: "10px",
                width: "39px",
                height: "39px",
                marginLeft: "20px",
            }}
            onClick={onClick}
        />
    );
}

export function PrevArrow(props: { className: string; style: React.CSSProperties; onClick: () => void }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "#4A9EFF",
                borderRadius: "10px",
                padding: "10px",
                width: "39px",
                height: "39px",
            }}
            onClick={onClick}
        />
    );
}