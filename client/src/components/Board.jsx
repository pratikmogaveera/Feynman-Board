import { useState, useEffect } from 'react'
import Sentence from './Sentence'

const Board = ({ boardContent, setboardContent }) => {
    // This function handles the change in category of the block of text.
    // It takes the id of the block of text and the value it needs to be set at.
    function handleChange(id, value) {
        const newContentArray = boardContent.content.map(item => item.cont_id === id ? { ...item, state: value } : item)
        const newBoardContent = { ...boardContent, content: newContentArray }
        setboardContent(newBoardContent)
    }

    const elements = boardContent.content.map(({ cont_id, state, text }) => <Sentence key={cont_id} cont_id={cont_id} text={text} state={state} handleChange={handleChange} edit={true} />)

    return (
        <div className="flex flex-col gap-1 h-full overflow-y-auto bg-white p-2 rounded-md">
            {elements}
        </div>
    )

}

export default Board