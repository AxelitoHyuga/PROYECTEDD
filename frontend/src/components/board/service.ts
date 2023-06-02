import axios from "axios";
import { Task } from "./reducer";

const baseUrl = "http://localhost:8989";

export const getBoards = async () => {
    let tokenStoraged = sessionStorage.getItem('kanao');
    if (tokenStoraged) {
        const { token } = JSON.parse(tokenStoraged) as { uid?: string,username?: string,token?: string };
        const res = await axios.get(
            `${baseUrl}/boards`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return { data: res.data, status: res.status };
    }
}

export const getBoardTasks = async(boardId: string) => {
    let tokenStoraged = sessionStorage.getItem('kanao');
    if (tokenStoraged) {
        const { token } = JSON.parse(tokenStoraged) as { uid?: string,username?: string,token?: string };
        const res = await axios.get(
            `${baseUrl}/boards/${boardId}/tasks`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return { data: res.data, status: res.status };
    }
}

export const addTask = async(data: Task, boardId: string) => {
    let tokenStoraged = sessionStorage.getItem('kanao');
    if (tokenStoraged) {
        const { token } = JSON.parse(tokenStoraged) as { uid?: string,username?: string,token?: string };
        const res = await axios.post(
            `${baseUrl}/boards/${boardId}/tasks`,
            {
                title: data.title,
                description: data.description,
                status: 1
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        return { data: res.data, status: res.status };
    }
}

export const updateTask = async(data: Task) => {
    let tokenStoraged = sessionStorage.getItem('kanao');
    if (tokenStoraged) {
        const { token } = JSON.parse(tokenStoraged) as { uid?: string,username?: string,token?: string };
        const res = await axios.put(
            `${baseUrl}/tasks/${data.id}`,
            {
                title: data.title,
                description: data.description,
                status: 1
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        return { data: res.data, status: res.status };
    }
}

export const searchTask = async(data: string) => {
    let tokenStoraged = sessionStorage.getItem('kanao');
    if (tokenStoraged) {
        const { token } = JSON.parse(tokenStoraged) as { uid?: string,username?: string,token?: string };
        const res = await axios.get(
            `${baseUrl}/tasks/${encodeURIComponent(data)}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );

        return { data: res.data, status: res.status };
    }
}