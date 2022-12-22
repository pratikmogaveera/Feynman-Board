import styles from "../styles"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { v4 } from 'uuid'
import Board from '../components/Board'
import axios from "axios"

function NewBoard() {
    const username = useSelector(state => state.userInfo.username)
    const navigate = useNavigate()
    const [saved, setSaved] = useState(false)
    const [next, setNext] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [boardContent, setboardContent] = useState([])

    const handleNext = () => {
        const pattern = /(?<=[,\.\?\/\\\(\)\-"'])/
        const result = content.split(pattern).map(item => item.trim()).filter(item => item.length)
        let newDoc = {
            doc_id: v4(), // Using uuid: v4 to create id for documents.
            title: title,
            author: username,
            content: result.map((item, i) => (
                {
                    cont_id: i,
                    text: item,
                    state: 0
                }
            )),
        }
        setboardContent(newDoc)
        setNext(true)
    }

    const handleSave = async () => {
        await axios.post('http://localhost:3001/', boardContent) // Posts the new Document to the Database
        setSaved(true) 
        navigate(`/board/${boardContent.doc_id}`) // Navigates back to the Dashboard
    }

    let total = 0
    let count = 0
    if (boardContent.content) {
        boardContent.content.forEach(element => total += element.state)
        count = boardContent.content.length
    }
    const percentage = total > 0 ? ((total / (count * 4)) * 100).toPrecision(4) : null

    return (
        <div className={`${styles.fullScreen} ${styles.flexCenter} flex-col gap-2 bg-[#1a1a1a]  p-4`}>
            <h1 className="text-white">Feynman Board</h1>
            <div className="bg-[#e6e6e6] px-4 py-8 flex flex-col gap-4 rounded-md  lg:w-[800px]">
                <button className="w-fit h-fit text-[18px] text-white font-semibold bg-blue-600" onClick={() => navigate('/dashboard')}>Dashboard</button>
                <div className="w-full flex flex-row gap-4 flex-nowrap">
                    <input
                        placeholder="Title..."
                        className="w-full text-[20px] flex-nowrap font-medium pl-4 pr-2 py-2 text-black outline-none rounded-md border-[2px] focus:border-blue-500"
                        onChange={(e) => setTitle(e.target.value)} // Keep the data always updated with the input.
                    />
                    <p
                        className={`flex items-center bg-${!percentage ? "white" : percentage >= 75 ? "green-500" : percentage >= 50 ? "yellow-500" : percentage >= 25 ? "blue-500" : "red-500"} rounded-md p-2 flex-nowrap`}
                    >
                        Percentage:{" "}
                        <span className="font-semibold">{percentage && (percentage + '%')}</span>
                    </p>
                </div>

                <div className="w-full h-[400px]" id="cont">
                    {!next ?
                        <textarea
                            id="textarea"
                            placeholder="Write your ideas."
                            onChange={(e) => setContent(e.target.value)} // Keep the data always updated with the textarea.
                            className="w-full h-full text-[18px] text-black p-4 rounded-md outline-none border-[2px] focus:border-blue-500"
                        >
                        </textarea>
                        :
                        <Board boardContent={boardContent} setboardContent={setboardContent} />
                    }
                </div>

                <div className="w-full flex justify-end gap-2">
                    {/* Render "Next" button only if you have not pressed it yet. */}
                    {!next && <button className="w-fit h-fit text-[18px] text-white font-semibold bg-blue-600" onClick={() => handleNext()}>Next</button>}
                    
                    {/* Render "Save" button only if you have pressed the "Next" button. */}
                    {next && <button className="w-fit h-fit text-[18px] text-white font-semibold bg-blue-600" onClick={() => handleSave()}>Save</button>}
                </div>
            </div>
        </div>
    )
}

export default NewBoard