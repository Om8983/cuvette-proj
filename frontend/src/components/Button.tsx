
type Proptype = {
  content: string;
  handlOnClick: () => void;
}
export const Button = ({ content, handlOnClick }: Proptype) => {
  return (
    <>
      <button className="outline-none ring-2 rounded-lg bg-transparent backdrop-blur-lg ring-black hover:ring-[#A6C242] hover:text-[#35A3C7]
        px-3 py-2 transition ease-in-out hover:scale-[0.9] text-lg font-serif " onClick={handlOnClick}> {content} </button>
    </>
  )
}
