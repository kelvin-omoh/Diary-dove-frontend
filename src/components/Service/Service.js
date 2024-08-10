import axiosInstance from "../../Utils/axiosInstance";

export const GetAllDiary = async (userInfo) => {
    const response = await axiosInstance.get("api/diaries/", {
        headers: {
            Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
            "Content-Type": "application/json",
        },
    });

    return response.data.data;
};



export const CreateDiary = async ({ userInfo, text }) => {
    const response = await axiosInstance.post(
        "api/diaries/",
        { content: text },
        {
            headers: {
                Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                "Content-Type": "application/json",
            },
        }
    );
    return response.data.data;
};


export const UpdateDiary = async ({ userInfo, text, editIndex }) => {
    const response = await axiosInstance.patch(
        `api/diaries/${editIndex}`,
        { content: text },
        {
            headers: {
                Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                "Content-Type": "application/json",
            },
        }
    );
    return response.data.data;
};



export const DeleteDiary = async ({ userInfo, index }) => {
    await axiosInstance.delete(`api/diaries/delete/${index}`, {
        headers: {
            Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
        },
    });
};