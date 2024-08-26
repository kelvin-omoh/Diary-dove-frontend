import React, { useEffect, useState } from "react";
import HomeTab from "./Tabs";
import trash from "../../assets/trash2.png";
import list from "../../assets/Vector list.png";
import edit from "../../assets/Vector 2.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BiBookOpen } from "react-icons/bi";
import { addHours, format, parseISO } from "date-fns";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PaginationItem } from "@mui/material";

const Notes = ({ allTexts, onEdit, onDelete, setAllTexts }) => {
    const [isGrid, setIsGrid] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = isGrid ? 8 : 3;

    useGSAP(() => {
        gsap.from(".notes", {
            opacity: 0,
            y: 400,
            delay: 0.7,
        });
        gsap.to(".notes", {
            opacity: 1,
            y: 0,
            delay: 0.9,
        });
    }, []);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNotes = allTexts?.slice(startIndex, startIndex + itemsPerPage);
    const pageCount = Math.ceil(allTexts?.length / itemsPerPage);

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

    }, [])

    return (
        <div className=" w-full pb-[3rem] px-[24px]   md:px-[80px] mt-[8px] md:mt-[49px] ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div
                    className={` pb-[48px] ${isGrid ? "h-full md:h-[85vh]" : "h-full md:h-[100vh]"} relative  w-full`}
                >
                    {/* <HomeTab allTexts={allTexts} isGrid={isGrid} setIsGrid={setIsGrid} /> */}
                    <HomeTab
                        setAllTexts={setAllTexts}
                        allTexts={allTexts}
                        isGrid={isGrid}
                        setIsGrid={setIsGrid}
                    />

                    {/* Notes */}
                    {paginatedNotes && paginatedNotes?.length === 0 && (
                        <p className="mt-[5.1rem] flex flex-col  gap-[1rem] justify-center text-gray-400 text-[1.5rem] text-center md:text-[2.2rem] items-center mx-auto w-full">
                            <BiBookOpen size={60} /> Your diary is Empty.
                            <span className=" text-[14px]">you can start creating diary</span>
                        </p>
                    )}
                    <div
                        className={`w-full notes grid ${isGrid ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
                            } gap-[16px]`}
                    >
                        {paginatedNotes &&
                            paginatedNotes.map((note, index) => (
                                <>
                                    <div
                                        key={note.id}
                                        // onClick={() => onEdit(note.id)}
                                        className="flex hover:shadow-md rounded-xl  justify-between flex-col md:min-h-[208px]  min-h-[200px]  bg-[#FFFFFF] p-[12px] md:p-[24px] sm:p-[24px]"
                                    >
                                        <div className="  ">
                                            <p className="text-[#E0A774] text-[12px] justify-start flex ">
                                                {formatNigerianTime(note.date)}
                                            </p>
                                            <div className="mt-[8px] w-full h-full">
                                                {note?.content && (
                                                    <p className="hidden lg:flex text-sm text-[#303236] justify-start text-left leading-[21px]  max-w-full ">
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
                                                    <p className=" lg:hidden text-[12px] md:text-[14px] text-[#151616] justify-start text-start leading-[16px] md:leading-[21px]">
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
                                            <button>
                                                <img
                                                    src={trash}
                                                    onClick={() => onDelete(note.id)}
                                                    alt={"trash"}
                                                    className="h-[16.13px]"
                                                />
                                            </button>

                                            <button>
                                                <img
                                                    src={list}
                                                    onClick={() => onEdit(note.id)}
                                                    alt={"list"}
                                                    className="h-[16.13px]"
                                                />
                                            </button>
                                        </div>
                                    </div>




                                </>
                            ))}


                        {/* {paginatedNotes.map((note, index) => (
                            <div key={note.id} className='flex justify-between flex-col md:max-h-[208px] h-[200px] bg-[#FFFFFF] p-[24px]'>
                                <div>
                                    <p className='text-[#E0A774] text-[12px] justify-start flex '>{note.time} | {note.date.format('YYYY-MM-DD')}</p>
                                    <div className=' mt-[8px]'>
                                        <p className='hidden md:flex text-[14px] text-[#303236] justify-start text-start leading-[21px] text-'>
                                            {note.description.length > 230 ? ` ${note.description.slice(0, 300)}...` : note.description}
                                        </p>
                                        <p className='flex md:hidden text-[14px] md:text-[14px] text-[#303236] justify-start text-start leading-[16px] md:leading-[21px] '>
                                            {note.description.length > 230 ? ` ${note.description.slice(0, 90)}...` : note.description}
                                        </p>
                                    </div>
                                </div>
                                <div className='mt-[18px] md:mt-[24.94px] flex items-center justify-start gap-[10.4px]'>
                                    <button>
                                        <img src={trash} onClick={() => onDelete(index)} alt={'trash'} className="h-[16.13px]" />
                                    </button>
                                    <button>
                                        <img src={edit} onClick={() => onEdit(index)} alt={'edit'} className="h-[16.13px]" />
                                    </button>
                                    <button>
                                        <img src={list} onClick={() => onEdit(index)} alt={'list'} className="h-[16.13px]" />
                                    </button>
                                </div>
                            </div>
                        ))} */}
                    </div>
                    {!paginatedNotes?.length < 1 && (
                        <Stack
                            spacing={2}
                            className={` grid items-center justify-around w-full  relative    left-0 ${isGrid ? "bottom-[-2.5rem]" : "bottom-[0.5rem]"
                                }  pt-6`}
                        >
                            <Pagination
                                count={pageCount}
                                page={currentPage}
                                className="w-full gap-[10px] items-center "
                                onChange={handleChangePage}
                                renderItem={(item) => <PaginationItem {...item} />}
                                sx={{
                                    "& .MuiPaginationItem-root": {
                                        display: "inline", // Ensure inline display for PaginationItem
                                        color: "black",
                                        backgroundColor: "#F1F2F3",
                                        "&:hover": {
                                            backgroundColor: "#F1F2F3",
                                        },
                                    },
                                    "& .MuiPaginationItem-page.Mui-selected": {
                                        backgroundColor: "#DA9658",
                                        color: "white",
                                    },
                                    "& .MuiPaginationItem-page:hover": {
                                        backgroundColor: "#da97588f",
                                        color: "white",
                                    },
                                    "& .MuiPaginationItem-ellipsis": {
                                        display: "none", // Hide ellipsis (...)
                                    },
                                    "& .MuiPaginationItem-previous, & .MuiPaginationItem-next": {
                                        backgroundColor: "white", // Background color for left and right arrows
                                        color: "black", // Text color for left and right arrows
                                    },
                                }}
                            />
                        </Stack>)}
                </div>
            </LocalizationProvider>
        </div>
    );
};

export default Notes;
