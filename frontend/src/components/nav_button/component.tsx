import { MouseEventHandler } from "react";

interface Props {
    icon: JSX.Element,
    text: string,
    className?: string,
    showText?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function NavButton({ icon, text, className = '', showText = false, onClick = () => {return false;} }: Props) {
    return (
        <button onClick={onClick} className={`flex items-center ${className}`}>
            {icon}
            {showText && <span className="text-white m-auto ml-3">{text}</span>}
        </button>
    );
}