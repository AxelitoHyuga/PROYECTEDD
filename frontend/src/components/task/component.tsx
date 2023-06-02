import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { Task, updateTasks } from "../board/reducer";
import { RiEditFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { updateTask } from "../board/service";

export default function TaskCard(props: { task: Task }) {
    const [edit, setEdit] = useState(false);
    const [taskTitle, setTaskTitle] = useState(props.task.title);
    const [taskValue, setTaskValue] = useState(props.task.description);
    const state = useAppSelector(state => state.boards);
    const dispatch = useAppDispatch();

    const onClickEdit = useCallback(async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEdit(!edit);

        if (edit && state.boardActive != null) {
            const tasks: Task[] = [];

            state.boardActive.tasks.forEach(val => tasks.push(Object.assign({}, val)));

            tasks.map((task) => {
                console.log(task);
                if (task.id === props.task.id) {
                    task.title = taskTitle;
                    task.description = taskValue;
                }

                return task;
            });

            const up = await updateTask({ id: props.task.id, title: taskTitle, description: taskValue });
            dispatch(updateTasks(tasks));
        }
    }, [edit, props, dispatch, state, taskTitle, taskValue]);

    const onChangeTitle = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTaskTitle(e.target.value ? e.target.value : '');
    }, []);

    const onChangeValue = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTaskValue(e.target.value ? e.target.value : '');
    }, []);

    return (
        <div className="bg-neutral-700 h-full drop-shadow-lg rounded-md p-3">
            <div className="w-full h-[20%] text-center text-white text-xl font-semibold">
            <textarea
                onChange={onChangeTitle}
                className="w-full h-full bg-transparent text-white resize-none"
                name={`task_title[${props.task.id}]`}
                disabled={!edit}
                value={ taskTitle }>
            </textarea>
            </div>
            <div className="w-full h-[60%]">
                <textarea
                onChange={onChangeValue}
                className="w-full h-full bg-transparent text-white resize-none"
                name={`task_description[${props.task.id}]`}
                disabled={!edit}
                value={ taskValue }>
                </textarea>
            </div>
            <div className="w-full h-[20%] flex justify-center items-center">
                <button 
                onClick={onClickEdit}
                className={`${!edit ? 'bg-blue-600' : 'bg-green-600'} w-20 h-8 p-2 text-white rounded-lg flex items-center justify-center`}
                name={`task_button[${props.task.id}]`}>
                   <RiEditFill />
                   { edit ? 'Save' : 'Edit' }
                </button>
            </div>
        </div>
    );
}