import React from "react";

type IfProps = {
	condition: boolean;
};

export default function If({ condition, children }: React.PropsWithChildren<IfProps>) {
	return condition ? <> {children} </> : null;
}
