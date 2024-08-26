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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreateDiary, DeleteDiary, GetAllDiary, UpdateDiary } from "../components/Service/Service";
import { BiBookOpen } from "react-icons/bi";





const Home = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(open);

    const [text, setText] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const { userInfo } = useContext(Usercontext)
    const [loading, setLoading] = useState(false);

    const { isLoading, data, isError, error } = useQuery('diaries', () => GetAllDiary(userInfo), { refetchOnWindowFocus: true })

    const [allTexts, setAllTexts] = useState(data ? data : []);
    const [isGrid, setIsGrid] = useState(true);
    const [isEdit, setIsEdit] = useState(false)



    const handleClickOpen = () => {
        setOpen(true);

    };

    useEffect(() => {
        if (data) {
            setAllTexts(data);
        } else {
            setAllTexts([]);
        }
    }, [data]);


    const handleClose = () => {
        setOpen(false);
        setText("");
        setEditIndex(null);
    };

    const createDiaryMutation = useMutation(
        ({ userInfo, text }) => CreateDiary({ userInfo, text }),
        {
            onSuccess: (newDiary) => {
                queryClient.invalidateQueries('diaries');
                toast.success("Diary created successfully");
            },
            onError: (error) => {
                toast.error("Failed to create diary");
                console.error("Error creating diary:", error);
            }
        }
    );

    const updateDiaryMutation = useMutation(
        ({ userInfo, text, editIndex }) => UpdateDiary({ userInfo, text, editIndex }),
        {
            onSuccess: (updatedDiary) => {
                queryClient.invalidateQueries('diaries');
                toast.success("Updated successfully");
            },
            onError: (error) => {
                toast.error("Failed to update diary");
                console.error("Error updating diary:", error);
            }
        }
    );




    const deleteDiaryMutation = useMutation(
        ({ userInfo, index }) => DeleteDiary({ userInfo, index }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('diaries');
                toast.success("Deleted successfully");
            },
            onError: (error) => {
                toast.error("Failed to delete ");
                console.error("Error deleting note:", error);
            }
        }
    );



    const handleSave = async () => {
        try {

            setLoading(true);
            if (!isEdit) {
                if (editIndex !== null) {
                    setText(editIndex.content)
                    await updateDiaryMutation.mutateAsync({ userInfo, text, editIndex });
                } else {
                    await createDiaryMutation.mutateAsync({ userInfo, text });
                }
            } else {
                await updateDiaryMutation.mutateAsync({ userInfo, text, editIndex });
            }
        } catch (error) {
            console.error("Error saving note:", error);
        } finally {
            setLoading(false);
            handleClose();
            refecthAftersave()
        }
    };

    const handleEdit = (index) => {
        const noteToEdit = allTexts?.find((note) => note?.id === index);
        setEditIndex(index);
        setText(noteToEdit?.content || "");
        setOpen(true);
    };

    const handleEdit2 = (index) => {
        const noteToEdit = allTexts.find((note) => note.id === index);

        const noteDate = new Date(noteToEdit?.date || null);
        console.log(noteToEdit);
        const today = new Date();
        const isSameDayCheck = noteDate.getFullYear() === today.getFullYear() &&
            noteDate.getMonth() === today.getMonth() &&
            noteDate.getDate() === today.getDate();

        console.log(isSameDayCheck);
        isSameDay ? setIsEdit(true) : setIsEdit(false);

        setEditIndex(index);
        console.log('noteToEdit?.content', noteToEdit?.content);

        setText(noteToEdit?.content || "");
    };

    const handleDelete = async (index) => {
        try {
            await deleteDiaryMutation.mutateAsync({ userInfo, index });
            setEditIndex(null);
            setText("");
            setAllTexts((prev) => prev.filter((note) => note.id !== index));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handleSaveOrUpdate = async () => {
        const noteToEdit = allTexts.find((note) => note.id === editIndex);
        console.log(noteToEdit);
        setText(noteToEdit?.content || "");

        if (editIndex) {
            handleSave();
        } else {
            createNote()
        }
        refecthAftersave()

    };




    const hanleEdit = async (index) => {
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
                console.log(response);
                // setAllTexts(response.data.data);
                // getAllNotes();
                toast.success("Updated successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create note");
        } finally {
            setLoading(false);
        }
    }

    const createNote = async () => {
        try {
            setLoading(true);
            await createDiaryMutation.mutateAsync({ userInfo, text });
            handleClose(); // Close dialog after creating the note

        } catch (error) {
            console.error("Error in createNote:", error);
            toast.error("Failed to create note");
            console.error("Error creating note:", error);
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

        // Split the full name by spaces and filter out any empty strings, then trim each part
        const nameParts = fullName
            .split(' ')
            .map(part => part.trim())
            .filter(part => part.length > 0);

        if (nameParts.length === 1) {
            return nameParts[0];  // Return just the first name if there's only one part
        }

        const firstName = nameParts[0];
        const lastNameInitial = nameParts[nameParts.length - 1][0].toUpperCase();
        return `${firstName} ${lastNameInitial}.`;
    };


    const refecthAftersave = () => {
        if (allTexts?.length > 0) {


            const today = new Date();


            console.log(today);
            const firstNoteDate = parseISO(allTexts[0].date);

            const foundIndex = allTexts.findIndex(note => isSameDay(parseISO(note.date), today));
            console.log(foundIndex);
            if (foundIndex !== -1) {
                console.log('note is found');
                setEditIndex(allTexts[foundIndex].id);
                setText(text.length > 3 ? text : allTexts[foundIndex].content)
            } else {
                console.log('If no matching note is found');
                setIsEdit(false)
                setText(null);
                setEditIndex(null);
            }
            console.log(editIndex);
        }
    }

    useEffect(() => {
        if (allTexts?.length > 0) {


            const today = new Date();


            console.log(today);
            const firstNoteDate = parseISO(allTexts[0].date);

            const foundIndex = allTexts.findIndex(note => isSameDay(parseISO(note.date), today));
            console.log(foundIndex);
            if (foundIndex !== -1) {
                console.log('diary is found');
                setText(allTexts[foundIndex].content);
                setEditIndex(allTexts[foundIndex].id);
            } else {
                console.log('If no matching diary is found');
                setIsEdit(false)
                setText(null);
                setEditIndex(null);
            }
            console.log(editIndex);
        }
    }, [allTexts, open2,]);
    return (
        <div className="  min-h-[100vh] overflow-hidden bg-[#FDFAF7]">
            <Header />

            <>
                {open2 && (
                    <div className={`  ${!open2 ? 'hidden' : 'block'}`}>
                        <div className={`  items-center justify-between w-full`}>
                            <div className={`pt-[104px] py-[16px] md:py-[132px] items-center flex gap-3 md:justify-between px-[24px] md:px-[80px]`}>
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
                                            Welcome {formatLastName(userInfo?.fullname?.trim())}
                                        </h1>
                                        <p className="text-[#7C7B87] text-[12px] md:text-[16px] leading-6">
                                            What are you writing about today?
                                        </p>
                                    </div>
                                </div>
                                <div className="w-fit">
                                    <button
                                        className="text-white block md:hidden w-[100px] md:w-[189px] px-[8px] py-[4px] md:px-[46px] md:py-[17px] text-[14px] md:text-[16px] rounded-[8px] bg-[#DA9658]"
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
                                            setAllTexts(data);
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
                    <div className={` md:hide-scrollbar  overflow-hidden relative ${open ? 'hidden' : ' hidden md:flex'}  mt-[72px]   pt-[32px] h-[100vh]  gap-3 md:justify-between px-[24px] lg:px-[80px]`}>
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
                                className="w-full mt-[50px] pr-[50px] lg:pr-[16px]  text-[18px] placeholder:text-[#29292d55] font-[400] bg-[#ff000000] lg:px-2  placeholder:font-[700]  border-0 outline-none"
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
                        <div className="fixed top-[64px] right-0 bg-[#ffffff] w-[300px] lg:w-[456px] min-h-[calc(100vh-64px)] overflow-y-auto pt-[16px] pb-[32px]">

                            <ul className=" border-b border-b-[#F1F2F3]  px-[42px] pb-[16px] w-full flex justify-between">
                                <li className=" text-[20px] font-[600]">Recent</li>
                                <button onClick={() => {
                                    setOpen2(true)
                                }} className=" ">See All</button>
                            </ul>

                            <div className=" px-[30px] lg:px-[56px] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 64px - 80px)' }}>
                                <div className=" flex   gap-[12px] flex-col">

                                    {allTexts.length == 0 && <p className="mt-[5.1rem] flex flex-col  gap-[1rem] justify-center text-gray-400 text-[1.5em] lg:text-[2.2rem] items-center mx-auto w-full">
                                        <BiBookOpen size={60} /> Your diary is Empty.
                                        <span className=" text-[14px]">you can start creating diary</span>
                                    </p>}
                                    {allTexts &&
                                        allTexts?.slice(0, 4).map((note, index) => (
                                            <div
                                                key={note.id}

                                                className={`flex   duration-150 ease-in hover:scale-105  transition-all  rounded-xl  justify-between flex-col md:min-h-[30px] gap-[8px]   max-h-[200px] hover:bg-orange-50/40 hover:px-[16px] bg-[#FFFFFF] py-[24px]  ${note.id === editIndex ? 'px-[16px] bg-orange-50/40  ' : 'bg-[#FFFFFF]'}`}
                                            >
                                                <div onClick={() => handleEdit2(note.id)} className="  ">
                                                    <p className="text-[#E0A774] text-[12px] justify-start flex ">
                                                        {formatNigerianTime(note.date)}
                                                    </p>
                                                    <div className="mt-[8px] w-full h-full">
                                                        {note?.content && (
                                                            <p className="hidden md:flex text-sm text-[#303236] justify-start text-left leading-[21px]  max-w-full ">
                                                                {note?.content?.length > 170
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
                                                            onClick={() => handleEdit2(note.id)}
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
                        height: "auto", // Default height for tablet and above screens
                        "@media (max-width: 767px)": {
                            // Phone screen size
                            height: "auto",
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
