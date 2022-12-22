import { useState } from "react"


const Sentence = ({ cont_id, text, state, handleChange, edit }) => {
    const style = state === 0 ? "bg-slate-200" : state === 4 ? "bg-green-500" : state === 3 ? "bg-yellow-500" : state === 2 ? "bg-blue-500" : "bg-red-500"

    return (
        <div className="flex justify-between flex-row gap-1 font-normal">
            <p className={`w-full h-fit p-2 text-[16px] ${style} text-black rounded-md`}>{text}</p>

            {/*  Select tag for selecting the category of the block. */}
            {/*  This will only render when we are creating a new board. */}
            {edit && <select
                id="options"
                className={`outline-none rounded-md w-fit h-fit ${style} p-2 `}
                onChange={(e) => handleChange(cont_id, parseInt(e.target.value))}
            >
                <option value={0} className="bg-white">Select Option</option>
                <option value={4} className="bg-green-500">Understood</option>
                <option value={3} className="bg-yellow-500">Somewhat Understood</option>
                <option value={2} className="bg-blue-500">Not Clear</option>
                <option value={1} className="bg-red-500">Rubbish</option>
            </select>
            }
        </div>
    )
}

export default Sentence