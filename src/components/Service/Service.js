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
        // toast.error(error.message);
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
        // toast.error(error.message);
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
        // toast.error(error.message);
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
        // toast.error(error.message);
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
        // toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
}



export const verifyOTPInEmailVerification = async ({ email, otp }) => {
    try {

        const res = await axiosInstance.post("/api/users/verifyOTP", {
            email,
            otp,
        });
        return res
    } catch (error) {
        // toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
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



export const GetUserReminders = async (userInfo) => {
    if (!userInfo?.token) {
        throw new Error('User token is missing');
    }

    const response = await axiosInstance.get('/api/reminders', {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
        },
    });

    return response.data.data.map((reminder) => {
        const hour = reminder.hour;
        const minute = reminder.time.toString().padStart(2, '0');
        const period = hour >= 12 ? 'PM' : 'AM';

        return {
            id: reminder.id,
            hour,
            minute,
            period,
        };
    });
};

export const fetchAllReminders = async (userInfo) => {
    if (!userInfo?.token || userInfo.token.length <= 4) {
        throw new Error('Invalid token');
    }

    try {
        const response = await axiosInstance.get('/api/reminders', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
            },
        });

        const fetchedReminders = response.data.data.map((reminder) => {
            const hour = reminder.hour;
            const minute = reminder.time.toString().padStart(2, '0');
            const period = hour >= 12 ? 'PM' : 'AM';

            return {
                id: reminder.id,
                hour: reminder.hour,
                minute: reminder.time,
                period: period,
            };
        });

        return fetchedReminders;
    } catch (error) {
        throw new Error('Error fetching reminders: ' + error.message);
    }
};



export const DeleteReminder = async ({ userInfo, id }) => {
    try {
        const response = await axiosInstance.delete(`/api/reminders/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }
    catch (error) {
        // toast.error(error.message);
        throw error;  // Propagate the error to useQuery
    }
};

