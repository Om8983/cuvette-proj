
type Proptype = {
    content: string;
    handleOnclick: () => void;
}
export const GoogleBtn = ({ content, handleOnclick }: Proptype) => {
    return (
        <>
            <div className=" w-[20rem] h-13 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-[2px] ">
                <button className=" relative z-10 w-full h-12 px-4 py-2 text-center bg-white text-black border-transparent rounded-lg outline-none transition-all ease-in-out duration-300 font-serif " onClick={handleOnclick}>
                    {content}
                </button>
            </div>
        </>
    )
}
