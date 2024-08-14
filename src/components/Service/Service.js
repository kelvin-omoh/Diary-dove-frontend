import toast from "react-hot-toast";
import axiosInstance from "../../Utils/axiosInstance";

export const GetAllDiary = async (userInfo) => {
    try {
        const response = await axiosInstance.get("api/diaries/", {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.data;
    }
    catch (error) {
        toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
};



export const CreateDiary = async ({ userInfo, text }) => {
    try {
        const response = await axiosInstance.post(
            "/api/diaries/",
            { content: text },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data.data;
    }
    catch (error) {
        toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
};


export const UpdateDiary = async ({ userInfo, text, editIndex }) => {
    try {
        const response = await axiosInstance.patch(
            `/api/diaries/${editIndex}`,
            { content: text },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Content-Type": "application/json",
                },
            }

        );
        return response.data.data;
    }
    catch (error) {
        toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
};



export const DeleteDiary = async ({ userInfo, index }) => {
    try {
        await axiosInstance.delete(`/api/diaries/delete/${index}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
            },
        });
    }
    catch (error) {
        toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
};

export const GetUserInfo = async (userInfo) => {
    try {
        const response = await axiosInstance.get("api/users/personalinfo", {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.data;  // Ensure you return only the data if needed
    } catch (error) {
        toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
}



export const verifyOTPInEmailVerification = async ({ verifyEmail, otp }) => {
    const res = await axiosInstance.post("/api/users/verifyOTP", {
        email: verifyEmail,
        otp,
    });
    return res
}


export const verifyOTPInWhatsappVerification = async ({ otp, userInfo }) => {
    const response = await axiosInstance.post("/api/users/verifyPhoneOTP", {
        otp,
    }, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
        }
    });
    return response
}
