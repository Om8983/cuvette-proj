
type Proptype = {
  content: string;
  handlOnClick: (value ?: string) => void;  // the value is optional since I used the same Btn for navigation on home page and also used this for sending bcknd req which has no inputs
  className ?: string
  }
export const Button = ({ content, handlOnClick, className }: Proptype) => {
  return (
    <>
      <button className={`text-center ring-0 rounded-lg  ring-black hover:ring-[#A6C242] hover:text-[#35A3C7]
        px-3 py-2 transition ease-in-out hover:scale-[0.9] text-lg font-serif ${className}`} onClick={() => handlOnClick()}  > {content} </button> 
      {/* i declared the onclick in diff way, ref:: home.tsx where the btn responsible for navigation
      and same btn compo is used for bcknd req on signup and login. */}
    </>
  )
}
