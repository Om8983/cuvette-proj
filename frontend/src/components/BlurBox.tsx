import { ReactNode } from "react"

type PrposType = {
    children: ReactNode
}
export const BlurBox = ({ children }: PrposType) => {
    return (
        <>

            <div className=" flex justify-end  ">
                <div className="flex flex-col gap-7 justify-center items-center  bg-transparent w-[50rem] h-[43.5rem]  outline-none backdrop-blur-[20px]  ">

                    {children}

                </div>


            </div>
        </>
    )
}
