import { useAppDispatch } from "../../utils/hooks";
import { Board, setBoardActive } from "./reducer";
import { useCallback, MouseEvent } from "react";
import { Task, insertTask, updateTasks } from "./reducer";
import { getBoardTasks } from "./service";

export default function BoardCard(props: { board: Board }) {
    const dispatch = useAppDispatch();
    const setActive = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const id = props.board.id;
        const fetchData = async() => {
            try {
                const tasks = await getBoardTasks(id);
                const taskArr: Task[] = [];

                if (tasks?.status === 200) {
                    const dataTask = tasks.data as Task[];
                    console.log(dataTask);

                    dataTask.forEach((task) => {
                        taskArr.push({ id: task.id, description: task.description, title: task.title });
                    });

                    dispatch(updateTasks(taskArr));
                }
            } catch(e) {
                console.log(e);
            }
        }

        fetchData();
        dispatch(setBoardActive(props.board))
    }, [dispatch, props]);

    return (
        <button onClick={ setActive } className="w-full h-14 bg-neutral-700 rounded-xl cursor-pointer text-white">
            { props.board.name }
        </button>
    );
}