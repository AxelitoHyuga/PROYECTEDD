import axios from "axios";

const baseUrl = "http://localhost:8989";

export const login = async (username: string, password: string) => {
    const res = await axios.post(
        `${baseUrl}/login`,
        { username, password }
    );

    return { data: res.data, status: res.status };
}

export const loginWithToken = async (token: string) => {
    const res = await axios.get(`${baseUrl}/loginWithToken?token=${token}`);

    return { data: res.data, status: res.status };
}