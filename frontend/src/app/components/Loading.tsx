import { FaSpinner } from "react-icons/fa";

export default function Loading ({size=44}) {
    return(
        <FaSpinner
        className={"animate-spin"}
        size={size}
        />
    )
}