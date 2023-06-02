import { Task } from "../board/reducer";

export default function TaskCardSimple(props: { task: Task }) {
    return (
        <div className="bg-neutral-700 h-60 drop-shadow-lg rounded-md p-3">
            <div className="w-full h-[20%] text-center text-white text-xl font-semibold">
            <textarea
                className="w-full h-full bg-transparent text-white resize-none"
                defaultValue={ props.task.title }>
            </textarea>
            </div>
            <div className="w-full h-[60%]">
                <textarea
                className="w-full h-full bg-transparent text-white resize-none"
                defaultValue={ props.task.description }>
                </textarea>
            </div>
        </div>
    );
}