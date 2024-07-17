import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import { BsPerson } from "react-icons/bs";
import Notes from "../components/_Home/Notes";
import { Dialog, DialogContent, CircularProgress } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { Usercontext } from "../context/userContext";
import useCheckToken from "../components/hooks/useCheckToken";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [allTexts, setAllTexts] = useState([]);
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const { userInfo } = useContext(Usercontext);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setText("");
    setEditIndex(null);
  };

  const getAllNotes = async () => {
    try {
      const response = await axios.get("api/diaries/", {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
          "Content-Type": "application/json",
        },
      });
      setAllTexts(response.data.data);
    } catch (error) {
      toast.error("Error while getting notes");
      console.error("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    getAllNotes();
  }, [userInfo]);

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

    const { time, date } = getCurrentDateTime();

    try {
      if (editIndex !== null) {
        // Update existing note
        const response = await axios.patch(
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
        getAllNotes();
        toast.success("Note updated successfully");
      } else {
        // Create new note
        const response = await axios.post(
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
      }
    } catch (error) {
      toast.error("Failed to save note");
      console.log(error);
      console.error("Error saving note:", error);
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

  const handleDelete = async (index) => {
    try {
      await axios.delete(`api/diaries/delete/${index}`, {
        headers: {
          Authorization: userInfo?.token ? `Bearer ${userInfo.token}` : "",
        },
      });
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
      const response = await axios.post(
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

  return (
    <div className="bg-[#FDFAF7]">
      <Header />
      <div className="pt-[104px] py-[32px] items-center flex gap-3 md:justify-between px-[24px] md:px-[80px]">
        <div className="flex items-center gap-[12px]">
          {userInfo?.profilePicture ? (
            <img
              src={userInfo?.profilePicture}
              className=" rounded-full size-[50px]"
              alt=""
            />
          ) : (
            <div className="bg-orange-300 p-[10px] text-white rounded-full">
              <BsPerson className="size-[40px]" />
            </div>
          )}

          <div className="flex flex-col items-start">
            <h1 className="leading-[21px] md:leading-[30px] font-[600] md:font-[700] text-[14px] md:text-[20px]">
              Welcome {userInfo?.username}
            </h1>
            <p className="text-[#7C7B87] text-[12px] md:text-[16px] leading-6">
              What are you writing about today?
            </p>
          </div>
        </div>
        <div>
          <button
            className="text-white w-[100px] md:w-[189px]  px-[12px] py-[12px] md:px-[46px] md:py-[17px] text-[14px] md:text-[16px] rounded-[8px] bg-[#DA9658]"
            onClick={handleClickOpen}
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

      <Dialog
        onClose={handleClose}
        open={open}
        sx={{
          "& .MuiDialog-paper": {
            width: "660px",
            overflow: "hidden",
            height: "500px", // Default height for tablet and above screens
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
            placeholder="Enter description..."
            className="outline-none w-full"
            cols="30"
            rows="10"
          ></textarea>
          <div className="flex justify-end mt-[24px] md:mt-[104px] items-center">
            <div>
              <button
                disabled={text?.length < 3}
                onClick={handleSaveOrUpdate}
                className={`px-[12px] text-[14px] font-[500] py-[8px]  ${
                  text?.length < 3 ? " bg-[#8e6d4eaa]" : " bg-[#DA9658]"
                } text-white rounded-[8px]`}
              >
                {loading ? (
                  <div className="text-white items-center gap-3 justify-center flex w-full h-full">
                    {editIndex ? "Editing..." : "Saving..."}{" "}
                    <CircularProgress size={24} style={{ color: "white" }} />
                  </div>
                ) : editIndex ? (
                  "Edit diary"
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
