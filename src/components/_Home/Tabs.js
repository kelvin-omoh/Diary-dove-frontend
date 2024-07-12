
import menu from '../../assets/Menu Candy Box.png'
import list from '../../assets/Vector.png'
export default function HomeTab({ isGrid, setIsGrid }) {



    return (
        <div className=' w-full mb-[32px]  flex justify-between items-center'>
            <div className=' bg-[#E0A7741A] flex gap-[4px] w-fit px-[4px] '>
                <button onClick={() => setIsGrid(true)} className={`  transition-all duration-300 ease-out ${isGrid && 'bg-[white]'}  w-[48px] md:w-[148px] justify-center px-[16px] py-[8px] gap-[8px]  rounded-lg flex my-[4px] items-center`}>
                    <img className=' size-[18px]' src={menu} alt={'grid'} />
                    <p className=' hidden md:bold'>Grid View</p>
                </button>
                <button onClick={() => setIsGrid(false)} className={`  transition-all duration-300 ease-out ${!isGrid && 'bg-[white]'}  w-[48px] md:w-[148px] justify-center px-[16px] py-[8px] gap-[8px]  rounded-lg flex my-[4px] items-center`}>
                    <img className=' w-[14.06px] h-[10.5px] ' src={list} alt={'grid'} />
                    <p className=' hidden md:bold'>
                        List View
                    </p>
                </button>
            </div>
            <div>
                <select className=' text-[#8F96A3] rounded-lg px-[16px] py-[8px]  ' name="" id="">
                    <option key={1} value="allTime">All Time</option>
                    <option key={2} value="lastWeek">Last Week</option>
                    <option key={3} value="L">Last Month</option>
                    <option key={4} value="allTime">Last 6 Month</option>
                    <option key={5} value="allTime">Last Year</option>
                </select>
            </div>

        </div>
    );
}
