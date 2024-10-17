import { Dispatch, ChangeEvent } from "react"
type PrposType = {
    content: string,
    value : string, 
    setValue : Dispatch<React.SetStateAction<string>>;
}
export const InputBox = ({ content, setValue }: PrposType) => {

    const handleOnChange = (e:ChangeEvent<HTMLInputElement> ) => {
        setValue(e.target.value)
    }
    return (
        <input type="text" className="bg-transparent backdrop-blur-3xl ring-2 ring-black rounded-lg  outline-none h-8 text-center transition ease-in-out hover:-translate-y-2 hover:scale-110 p-6" onChange={handleOnChange} placeholder={content} />
    )
}
