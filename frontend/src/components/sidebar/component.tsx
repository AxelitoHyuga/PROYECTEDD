import NavButton from "../nav_button/component";
import { TiHome } from 'react-icons/ti';
// import { GoSearch } from 'react-icons/go';
import { BiSearchAlt } from 'react-icons/bi';
import { useCallback, useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { VscFolderLibrary } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import BoardCard from "../board/card";
import { getBoardTasks, getBoards, searchTask } from "../board/service";
import { Board, Task, setBoards } from "../board/reducer";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { renderToString } from "react-dom/server"
import TaskCardSimple from "../task/simple";

export default function Sidebar() {
    const [ isColapsed, setIsColapsed ] = useState(false);
    const navigate = useNavigate();
    const state = useAppSelector(state => state.boards);
    const dispatch = useAppDispatch();

    function renderThumb({ style, ...props}: { style: any }) {
        const top = 0;
        const thumbStyle = {
            backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const boards = await getBoards();

                if (boards?.status === 200) {
                    const data = boards.data as Board[];
                    const boardArr: Board[] = [];

                    data.forEach((d) => {
                        boardArr.push({
                            id: d.id,
                            name: d.name,
                            tasks: []
                        });
                    });
                    dispatch(setBoards(boardArr));
                }
            } catch (e) {
                console.log(e);
            }

        }

        fetchData();
    }, [dispatch]);

    const viewModalSearchTask = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        Swal.fire({
            title: 'Search Task',
            html:
                `<input id="searchTaskTitle" class="swal2-input" placeholder="Search Task">
                <div id="taskSearchContainer" class="swal2-container"></div>`,
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            allowEnterKey: () => !Swal.isLoading(),
            preConfirm: async () => {
                const val1 = (document.getElementById('searchTaskTitle') as HTMLInputElement).value;
                const container = (document.getElementById('taskSearchContainer') as HTMLDivElement);

                if (val1 == null) {
                    Swal.showValidationMessage('Search Task is required !');
                    return;
                }

                try {
                    const searched = await searchTask(val1);

                    if (searched?.status === 200) {
                        const data = searched.data as Task;
                        
                        Swal.fire({
                            html: renderToString(<TaskCardSimple task={ { title: data.title, description: data.description, id: data.id } } />),
                        });
                    }
                } catch (err) {
                    console.log(err);
                    if (err instanceof AxiosError) {
                        if (err.response?.status === 404) {
                            Swal.fire({
                                icon: 'error',
                                text: `Task Not Found`,
                                timer: 1500,
                                timerProgressBar: true
                            });
                        }
                    }
                    Swal.hideLoading();
                }

            },
            confirmButtonText: 'Search',
        });
    }, []);

    return (
        <aside className={`bg-transparent ${isColapsed ? 'w-[6rem]' : 'w-1/5'} p-2`}>
            <div className="bg-transparent h-1/6 pb-1">
                <div className={`bg-neutral-800 w-full h-full rounded-lg p-2 ${!isColapsed ? 'px-6' : ''}`}>
                    <NavButton className={`h-1/2 ${isColapsed ? 'm-auto' : ''}`} showText={!isColapsed} onClick={() => { navigate('/') }} icon={<TiHome className="m-auto mx-0" size="1.5rem" color="white" />} text="Home" />
                    <NavButton onClick={viewModalSearchTask} className={`h-1/2 ${isColapsed ? 'm-auto' : ''}`} showText={!isColapsed} icon={<BiSearchAlt className="m-auto mx-0" size="1.5rem" color="white" />} text="Search" />
                </div>
            </div>
            <div className="bg-transparent h-5/6 pt-1">
                <div className={`bg-neutral-800 w-full h-full rounded-lg p-2`}>
                    <div className={`h-10 flex items-center ${!isColapsed ? 'px-5' : ''}`}>
                        <NavButton className={`${isColapsed ? 'm-auto' : ''}`} showText={!isColapsed} onClick={() => { setIsColapsed(!isColapsed) }} icon={<VscFolderLibrary size='1.5rem' color='white' />} text='Your Library' />
                    </div>
                    <div>
                        { state.boards.length > 0 && state.boards.map(board => (
                            <div className="p-1">
                                <BoardCard board={ { id: board.id, name: board.name, tasks: board.tasks } } />
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        </aside>
    );
}