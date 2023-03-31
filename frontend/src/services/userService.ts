import axios from "axios";

const baseUrl = "http://localhost:8080";

export const login = async (username: String, password: String) => {
    const res = await axios.post(
        `${baseUrl}/login`,
        { username, password }
    );

    return { data: res.data, status: res.status };
}