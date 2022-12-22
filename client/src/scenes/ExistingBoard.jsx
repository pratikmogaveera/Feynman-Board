import styles from "../styles"
import { useState, useEffect } from 'react'
import Sentence from "../components/Sentence"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'



function ExistingBoard() {
    const { doc_id } = useParams()
    const [data, setData] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, [])

    async function getData() {
        const { data: result } = await axios.get(`http://localhost:3001/doc/${doc_id}`)
        setData(() => result)
    }

    const [saved, setSaved] = useState(false)
    const [boardContent, setboardContent] = useState([])
    let percentage = null
    if (data) {
        let total = 0
        let count = data?.content?.length
        data.content.forEach(element => {
            total += element.state
        });
        percentage = ((total / (count * 4)) * 100).toPrecision(4)
    }
    
    const elements = data ? data.content.map(item => <Sentence key={item.cont_id} cont_id={item.cont_id} text={item.text} state={item.state} edit={false} />) : <p>No Data.</p>

    return (
        <div className={`${styles.fullScreen} ${styles.flexCenter} flex-col gap-2 bg-[#1a1a1a]  p-4`}>
            <div className="bg-[#e6e6e6] px-4 py-8 flex flex-col gap-4 rounded-md  lg:w-[800px]">
                <button
                    className="w-fit h-fit text-[18px] text-white font-semibold bg-blue-500"
                    onClick={() => navigate('/dashboard')}
                >
                    Dashboard
                </button>
                <div className="w-full flex flex-row gap-4 flex-nowrap">
                    <p className="w-full text-[24px] flex-nowrap font-medium pr-2 py-2 text-black outline-none rounded-md" >Title: <span className="font-semibold">{data?.title}</span></p>
                    <p className={`flex text-[20px] items-center bg-${!percentage ? "white" : percentage >= 75 ? "green-500" : percentage >= 50 ? "yellow-500" : percentage >= 25 ? "blue-500" : "red-500"} rounded-md p-2 flex-nowrap`}>
                        Percentage:<span className="font-semibold ml-2">{percentage && (percentage + '%')}</span>
                    </p>
                </div>

                <div className="w-full h-[400px]">
                    <div className="bg-white w-full h-full px-2 py-4 rounded-md">
                        <p className="text-[20px] font-normal">
                            {/* {data ? data.content.map(item => <span key={item.cont_id} className={`leading-[28px] ${item.state === 4 ? "text-green-400" : item.state === 3 ? "text-yellow-400" : item.state == 2 ? "text-blue-400" : "text-red-400"}`}>{item.text} </span>) : "No Data"} */}
                            {data ? data.content.map(item => <span key={item.cont_id} className={`leading-[28px] ${item.state === 4 ? "bg-green-400" : item.state === 3 ? "bg-yellow-400" : item.state == 2 ? "bg-blue-400" : "bg-red-400"}`}>{item.text} </span>) : "No Data"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExistingBoard