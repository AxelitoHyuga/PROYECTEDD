import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import TaskCard from "../task/component";
import { IoMdAddCircle } from "react-icons/io";
import { useCallback } from "react";
import Swal from "sweetalert2";
import { Task, insertTask } from "./reducer";
import { addTask } from "./service";

export default function BoardModule() {
    const state = useAppSelector(state => state.boards);
    const dispatch = useAppDispatch();

    const newTask = useCallback(() => {
        Swal.fire({
            title: 'Add Task',
            html:
                `<input id="newTaskName" class="swal2-input" placeholder="Title">
                <textarea id="newTaskDesc" class="swal2-textarea" placeholder="Description"></textarea>`,
            focusConfirm: false,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            allowEnterKey: () => !Swal.isLoading(),
            preConfirm: async () => {
                const val1 = (document.getElementById('newTaskName') as HTMLInputElement).value;
                const val2 = (document.getElementById('newTaskDesc') as HTMLTextAreaElement).value;

                if (val1 == null) {
                    Swal.showValidationMessage('Task title is required !');
                    return;
                }

                if (val2 == null) {
                    Swal.showValidationMessage('Task description is required !');
                    return;
                }

                if (state.boardActive != null) {
                    const task = await addTask({ id: null, title: val1, description: val2 }, state.boardActive?.id);
    
                    if (task?.status === 201) {
                        const data = task.data as Task;
                        dispatch(insertTask({ id: data.id, title: data.title, description: data.description }));

                        Swal.close();
                    }
                }

            },
            confirmButtonText: 'Add'
        });
    }, [dispatch, state]);

    return (
        <article className="w-full h-full">
            { state.boardActive != null ?
                <div className="h-full -mt-14 pt-14 px-7">
                    <div className="w-full h-14 flex items-center justify-end">
                        <button onClick={newTask} className="w-20 h-7 bg-blue-600 rounded-xl text-center flex justify-center items-center">
                            <IoMdAddCircle color="white" />
                        </button>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between">
                    { state.boardActive.tasks.length > 0 ?
                        state.boardActive.tasks.map(task => (
                        <div className="basis-1/2 p-2 h-60">
                            <TaskCard task={ { title: task.title, description: task.description, id: task.id } }/>
                        </div>)) :
                        <></>
                    }
                    </div>
                </div> :
                <div className="h-full -mt-14 pt-14 px-7 flex justify-center items-center">
                    <div className="">
                        <h1 className="text-white font-semibold text-4xl drop-shadow-lg">No board selected</h1>
                    </div>
                </div>
            }
        </article>
    );
}