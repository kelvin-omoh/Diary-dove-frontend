import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/Header';
import { BsPerson } from 'react-icons/bs';
import Notes from '../components/_Home/Notes';
import { Dialog, DialogContent, Slide } from '@mui/material';

const Home = () => {
    const [open, setOpen] = useState(false);
    const [allTexts, setAllTexts] = useState([]);
    const [text, setText] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setText('');
        setEditIndex(null);
    };

    const handleSave = () => {
        const getCurrentDateTime = () => {
            const currentDate = new Date();
            const time = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
            const date = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            return { time, date };
        };
        const { time, date } = getCurrentDateTime();

        if (editIndex !== null) {
            const updatedTexts = allTexts.map((item, index) =>
                index === editIndex ? { ...item, description: text, time, date } : item
            );
            setAllTexts(updatedTexts);
        } else {
            const newNote = {
                id: allTexts.length + 1,
                time,
                date,
                description: text,
            };
            setAllTexts((prev) => [...prev, newNote]);
        }
        setText('');
        handleClose();
    };

    const handleEdit = (index) => {
        setText(allTexts[index].description);
        setEditIndex(index);
        setOpen(true);
    };

    const handleDelete = (index) => {
        setAllTexts((prev) => prev.filter((_, i) => i !== index));
    };



    useEffect(() => {
        console.log(allTexts);
    }, [allTexts]);

    const SimpleDialog = useMemo(() => (props) => {
        const { onClose, open, handleSave, text, setText } = props;

        return (
            <Dialog
                onClose={onClose}
                open={open}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '660px',
                        overflow: 'hidden',
                        height: '500px', // Default height for tablet and above screens

                        '@media (max-width: 767px)': { // Phone screen size
                            height: '350px',
                        },
                    },
                }}
            >
                <DialogContent>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Enter description...'
                        className='outline-none w-full'
                        cols="30"
                        rows="10"
                    ></textarea>
                    <div className='flex justify-end mt-[24px] md:mt-[104px] items-center' >
                        <div>
                            <button disabled={text.length < 3} onClick={handleSave} className={`px-[12px] text-[14px] font-[500] py-[8px]  ${text.length < 3 ? ' bg-[#8e6d4eaa]' : ' bg-[#DA9658]'} text-white rounded-[8px]`}>
                                Save
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }, []);

    return (
        <div className='bg-[#FDFAF7]'>
            <Header />
            <div className='pt-[104px] py-[32px] items-center flex gap-3 md:justify-between px-[24px] md:px-[80px]'>
                <div className='flex items-center gap-[12px]'>
                    <div className='bg-orange-300 p-[10px] text-white rounded-full'>
                        <BsPerson className='size-[40px]' />
                    </div>
                    <div className='flex flex-col items-start'>
                        <h1 className='leading-[21px] md:leading-[30px] font-[600] md:font-[700] text-[14px] md:text-[20px]'>Welcome Enaikele K.</h1>
                        <p className='text-[#7C7B87] text-[12px] md:text-[16px] leading-6'>What are you writing about today?</p>
                    </div>
                </div>
                <div>
                    <button className='text-white w-[100px] md:w-[189px]  px-[12px] py-[12px] md:px-[46px] md:py-[17px] text-[14px] md:text-[16px] rounded-[8px] bg-[#DA9658]' onClick={handleClickOpen}>
                        Create note
                    </button>
                </div>
            </div>

            <Notes allTexts={allTexts} onEdit={handleEdit} onDelete={handleDelete} />


            <SimpleDialog
                open={open}
                text={text}
                setText={setText}
                handleSave={handleSave}
                onClose={handleClose}
            />

        </div>
    );
};

export default Home;
