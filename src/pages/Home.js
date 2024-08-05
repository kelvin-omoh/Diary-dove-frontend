import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import { BsPerson } from "react-icons/bs";
import Notes from "../components/_Home/Notes";
import { Dialog, DialogContent, CircularProgress, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { Usercontext } from "../context/userContext";
import useCheckToken from "../components/hooks/useCheckToken";
import axiosInstance from "../Utils/axiosInstance";
import { addHours, format, parseISO, isSameDay } from "date-fns";
import trash from "../assets/trash2.png";
import list from "../assets/Vector list.png";
const Home = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(open);
    const [allTexts, setAllTexts] = useState([]);
    const [text, setText] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const { userInfo } = useContext(Usercontext);
    const [loading, setLoading] = useState(false);
    const [isGrid, setIsGrid] = useState(true);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setText("");
        setEditIndex(null);
    };

    const getAllNotes = async () => {
        if (useCheckToken) {
            try {
                const response = await axiosInstance.get("api/diaries/", {
                    headers: {
                        Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                        "Content-Type": "application/json",
                    },
                });
                console.log(response.data.data);
                setAllTexts(response.data.data);
            } catch (error) {
                toast.error("Error while getting notes");
                console.error("Error fetching notes:", error);
            }
        }
    };


    useEffect(() => {
        if (
            userInfo.token !== "" &&
            userInfo.token !== undefined &&
            userInfo.token !== null
        ) {
            getAllNotes();
        }
    }, [userInfo?.token]);



    const handleSave = async () => {
        const getCurrentDateTime = () => {
            const currentDate = new Date();
            const time = currentDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
            });
            const date = currentDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });
            return { time, date };
        };

        try {
            if (editIndex !== null) {
                // Update existing note
                setLoading(true)
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
                console.log(response);
                // setAllTexts(response.data.data);
                getAllNotes();
                toast.success("Note updated successfully");
                setLoading(false)
            } else {
                // Create new note
                setLoading(true)
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
                setAllTexts((prevNotes) => [response.data.data, ...prevNotes]);
                toast.success("Note created successfully");
                setLoading(false)
            }
        } catch (error) {
            toast.error("Failed to save note");
            console.log(error);
            console.error("Error saving note:", error);
            setLoading(false)
        } finally {
            setLoading(false);
            handleClose();
        }
    };

    const handleEdit = (index) => {
        const noteToEdit = allTexts.find((note) => note.id === index);
        setEditIndex(index);
        setText(noteToEdit?.content || "");
        setOpen(true);
    };

    const handleEdit2 = (index) => {
        const noteToEdit = allTexts.find((note) => note.id === index);
        setEditIndex(index);
        setText(noteToEdit?.content || "");
        // setOpen(true);
    };

    const handleDelete = async (index) => {

        try {
            await axiosInstance.delete(`api/diaries/delete/${index}`, {
                headers: {
                    Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                },
            });
            setEditIndex(null)
            setText("");
            setAllTexts((prev) => prev.filter((note) => note.id !== index));
            toast.success("Note deleted successfully");


        } catch (error) {
            toast.error("Failed to delete note");
            console.error("Error deleting note:", error);
            console.log(error);
        }
    };

    const handleSaveOrUpdate = async () => {
        if (editIndex !== null) {
            handleSave();
        } else {
            createNote();
        }
    };

    const createNote = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                "api/diaries/",
                {
                    content: text,
                },
                {
                    headers: {
                        Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
                        "Content-Type": "application/json",
                    },
                }
            );
            const newNote = response.data.data;
            setAllTexts((prevNotes) => [newNote, ...prevNotes]);
            toast.success("Note created successfully");
            handleClose(); // Close dialog after creating note
        } catch (error) {
            console.log(error);
            toast.error("Failed to create note");
        } finally {
            setLoading(false);
        }
    };

    const formatLastName = (str) => {
        if (str && str?.includes(" ")) {
            const names = str.split(" ");
            const lastName = names.pop(); // Get the last word
            const formattedName = `${names.join(" ")} ${lastName
                .charAt(0)
                .toUpperCase()}.`; // Join the non-last names and add formatted last name
            return formattedName;
        } else {
            return str; // Return the name as is if there is no space
        }
    };

    useEffect(() => {
        // Function to handle screen size changes
        const handleResize = () => {
            if (window.innerWidth <= 768) { // Adjust the width threshold as needed
                setOpen2(true);
            } else {
                setOpen2(false);
            }
        };

        // Set the initial state based on the screen size
        handleResize();

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const formatNigerianTime = (isoDateString) => {
        try {
            const date = parseISO(isoDateString); // Parse ISO string to Date object
            const nigerianTime = addHours(date, 0); // Add 1 hour to convert from UTC to WAT
            const formattedTime = format(nigerianTime, "h:mm a"); // Format time in 12-hour format
            const formattedDate = format(nigerianTime, "MMMM d, yyyy"); // Format date as yyyy-MM-dd
            return `${formattedTime.toLowerCase()} | ${formattedDate}`; // Combine time and date in desired format
        } catch (error) {
            console.error("Error formatting time:", error);
            return "Invalid Time"; // or any fallback value
        }
    };


    useEffect(() => {
        const textarea = document.getElementById('auto-resize-textarea');
        if (textarea) {
            textarea.style.height = '50vh';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setText(e.target.value);
    };


    const formatName = (fullName) => {
        if (!fullName) return '';

        const nameParts = fullName.split(' ');
        if (nameParts.length === 1) {
            return nameParts[0];
        }

        const firstName = nameParts[0];
        const lastNameInitial = nameParts[nameParts.length - 1][0].toUpperCase();
        return `${firstName} ${lastNameInitial}.`;
    };


    useEffect(() => {
        if (allTexts.length > 0) {
            const today = new Date();
            console.log(today);
            const firstNoteDate = parseISO(allTexts[0].date);
            const foundIndex = allTexts.findIndex(note => isSameDay(parseISO(note.date), today));

            if (foundIndex !== -1) {
                setText(allTexts[foundIndex].content);
                setEditIndex(allTexts[foundIndex].id);
            } else {
                setText(null);
                setEditIndex(null);
            }
        }
    }, [allTexts, new Date()]);
    return (
        <div className="  overflow-hidden bg-[#FDFAF7]">
            <Header />

            <>
                {open2 && (
                    <div className={`  ${!open2 ? 'hidden' : 'block'}`}>
                        <div className={`  items-center justify-between w-full`}>
                            <div className={`pt-[104px] py-[32px] items-center flex gap-3 md:justify-between px-[24px] md:px-[80px]`}>
                                <div className="flex items-start gap-[12px]">
                                    {userInfo?.profilePicture ? (
                                        <img
                                            src={userInfo?.profilePicture}
                                            className="object-cover object-center rounded-full size-[40px]"
                                            alt=""
                                        />
                                    ) : (
                                        <div className="bg-orange-300 p-[10px] text-white rounded-full">
                                            <BsPerson className="size-[30px]" />
                                        </div>
                                    )}
                                    <div className="flex flex-col items-start">
                                        <h1 className="leading-[21px] m-0 md:leading-[30px] font-[600] md:font-[700] text-[14px] md:text-[20px]">
                                            Welcome {formatName(userInfo?.fullname)}
                                        </h1>
                                        <p className="text-[#7C7B87] text-[12px] md:text-[16px] leading-6">
                                            What are you writing about today?
                                        </p>
                                    </div>
                                </div>
                                <div className="w-fit">
                                    <button
                                        className="text-white block md:hidden w-[100px] md:w-[189px] px-[12px] py-[12px] md:px-[46px] md:py-[17px] text-[14px] md:text-[16px] rounded-[8px] bg-[#DA9658]"
                                        onClick={handleClickOpen}
                                    >
                                        Create note
                                    </button>
                                    <button
                                        className="text-white hidden md:block w-[100px] md:w-[189px] px-[12px] py-[12px] md:px-[46px] md:py-[17px] text-[14px] md:text-[16px] rounded-[8px] bg-[#DA9658]"
                                        onClick={() => {
                                            setOpen2(false)
                                            setEditIndex(null)
                                            setText('')
                                        }

                                        }
                                    >
                                        Create note
                                    </button>
                                </div>
                            </div>
                            <Notes
                                setAllTexts={setAllTexts}
                                allTexts={allTexts}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>

                        <div >

                        </div>
                    </div>
                )}
            </>

            <>
                {!open2 && (
                    <div className={` md:hide-scrollbar  overflow-hidden relative ${open ? 'hidden' : ' hidden md:flex'}  mt-[72px]   pt-[32px] h-[100vh]  gap-3 md:justify-between px-[24px] md:px-[80px]`}>
                        <div className="flex  flex-col    w-[70%]  px-[16px] items-start gap-[12px]">
                            <div className=" flex items-center gap-4 ">
                                {userInfo?.profilePicture ? (
                                    <img
                                        src={userInfo?.profilePicture}
                                        className="object-cover object-center rounded-full size-[50px]"
                                        alt=""
                                    />
                                ) : (
                                    <div className="bg-orange-300 p-[10px] text-white rounded-full">
                                        <BsPerson className="size-[40px]" />
                                    </div>
                                )}
                                <div className="flex flex-col items-start">
                                    <h1 className="leading-[21px] m-0 md:leading-[30px] font-[600] md:font-[700] text-[14px] md:text-[16px]">
                                        Hello ✌️
                                    </h1>
                                    <p className="text-[#7C7B87] text-[12px] md:text-[16px] leading-6">
                                        {formatLastName(userInfo?.fullname)}
                                    </p>
                                </div>
                            </div>

                            <textarea
                                id="auto-resize-textarea"
                                value={text}
                                onChange={handleInput}
                                className="w-full mt-[50px] pr-[16px]  text-[40px] placeholder:text-[#29292d55] font-[400] bg-[#ff000000] px-2  placeholder:font-[700]  border-0 outline-none"
                                placeholder="What’s on your mind today..."

                            />

                            <button
                                disabled={text?.length < 3}
                                onClick={handleSaveOrUpdate}
                                className={`px-[12px] flex  text-[14px] my-[18px] font-[500] py-[8px] ${text?.length < 3 ? 'bg-[#da97589e]' : 'bg-[#DA9658]'
                                    } text-white rounded-[8px]`}
                            >
                                {loading ? (
                                    <div className="text-white items-center gap-3 justify-center flex w-full h-full">
                                        {editIndex ? 'Editing...' : 'Saving...'}{' '}
                                        <CircularProgress size={24} style={{ color: 'white' }} />
                                    </div>
                                ) : editIndex ? (
                                    'Save changes'
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>
                        <div className=" fixed top-[64px] pt-[16px] pb-[32px] right-0 bg-[#ffffff] w-[456px] h-[100vh]" >
                            <ul className=" border-b border-b-[#11181e]  px-[42px] pb-[16px] w-full flex justify-between">
                                <li className=" text-[20px] font-[600]">Recent</li>
                                <button onClick={() => {

                                    setOpen2(true)

                                }
                                } className=" ">See All</button>
                            </ul>

                            <div className=" px-[56px] ">
                                <div className=" flex gap-[12px] flex-col">

                                    {allTexts &&
                                        allTexts.slice(0, 4).map((note, index) => (
                                            <div
                                                key={note.id}

                                                className={`flex  duration-150 ease-in hover:scale-105  transition-all  rounded-xl  justify-between flex-col md:min-h-[30px] gap-[8px]   max-h-[200px] hover:bg-orange-50/40 hover:px-[16px] bg-[#FFFFFF] py-[24px]  ${note.id === editIndex ? 'px-[16px] bg-orange-50/40  ' : 'bg-[#FFFFFF]'}`}
                                            >
                                                <div onClick={() => handleEdit2(note.id)} className="  ">
                                                    <p className="text-[#E0A774] text-[12px] justify-start flex ">
                                                        {formatNigerianTime(note.date)}
                                                    </p>
                                                    <div className="mt-[8px] w-full h-full">
                                                        {note?.content && (
                                                            <p className="hidden md:flex text-sm text-[#303236] justify-start text-left leading-[21px]  max-w-full ">
                                                                {note?.content.length > 170
                                                                    ? isGrid
                                                                        ? `${note?.content.slice(0, 170)}${note?.content.length > 170 ? "..." : ""
                                                                        }`
                                                                        : `${note?.content.slice(0, 900)}${note?.content.length > 900 ? "..." : ""
                                                                        }`
                                                                    : note?.content}
                                                            </p>

                                                        )}
                                                        {note?.content && (
                                                            <p className=" md:hidden text-[12px] md:text-[14px] text-[#151616] justify-start text-start leading-[16px] md:leading-[21px]">
                                                                {note?.content.length > 150
                                                                    ? `${note?.content.slice(0, isGrid ? 90 : 250)}${note?.content.length > (isGrid ? 90 : 200)
                                                                        ? "..."
                                                                        : ""
                                                                    }`
                                                                    : note?.content}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-[18px] md:mt-[24.94px] flex items-center justify-start gap-[10.4px]">
                                                    <button type="button" >
                                                        <img
                                                            src={trash}
                                                            onClick={() => handleDelete(note.id)}
                                                            alt={"trash"}
                                                            className="h-[16.13px]"
                                                        />
                                                    </button>

                                                    <button>
                                                        <img
                                                            src={list}
                                                            onClick={() => handleEdit(note.id)}
                                                            alt={"list"}
                                                            className="h-[16.13px]"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </>



            <Dialog
                onClose={handleClose}
                open={open}
                sx={{
                    "& .MuiDialog-paper": {
                        width: "660px",
                        overflow: "hidden",
                        height: "333px", // Default height for tablet and above screens
                        "@media (max-width: 767px)": {
                            // Phone screen size
                            height: "350px",
                        },
                    },
                }}
            >
                <DialogContent>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter diary entry ..."
                        className="outline-none h-[144px]  w-full"
                        cols="30"
                        rows="10"
                    ></textarea>
                    <div className="flex justify-end mt-[24px] md:mt-[104px] items-center">
                        <div>
                            <button
                                disabled={text?.length < 3}
                                onClick={handleSaveOrUpdate}
                                className={`px-[12px] text-[14px] font-[500] py-[8px]  ${text?.length < 3 ? " bg-[#8e6d4eaa]" : " bg-[#DA9658]"
                                    } text-white rounded-[8px]`}
                            >
                                {loading ? (
                                    <div className="text-white  items-center gap-3 justify-center flex w-full h-full">
                                        {editIndex ? "Editing..." : "Saving..."}{" "}
                                        <CircularProgress size={24} style={{ color: "white" }} />
                                    </div>
                                ) : editIndex ? (
                                    "Save changes"
                                ) : (
                                    "Save"
                                )}
                            </button>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Home;
