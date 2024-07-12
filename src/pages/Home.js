import React from "react";
import Header from "../components/Header";
import { BsPerson } from "react-icons/bs";
import Notes from "../components/_Home/Notes";

const Home = () => {
  return (
    <div className="  bg-[#FDFAF7] ">
      <Header />
      <div className=" pt-[104px] py-[32px] items-center flex justify-between px-[80px] ">
        <div className=" flex items-center gap-[12px]   ">
          <div className=" bg-orange-300 p-[10px] text-white  rounded-full">
            <BsPerson className=" size-[40px] " />
          </div>
          <div className=" flex flex-col  items-start">
            <h1 className=" leading-[30px] font-[700] text-[20px]">
              Welcome Enaikele K.
            </h1>
            <p className=" text-[#7C7B87] leading-6 ">
              What are you writing about today?
            </p>
          </div>
        </div>
        <div>
          <button className=" text-white w-[189px] px-[46px] py-[17px] rounded-[8px]  bg-[#DA9658]">
            Create note
          </button>
        </div>
      </div>

      <Notes />
    </div>
  );
};

export default Home;
