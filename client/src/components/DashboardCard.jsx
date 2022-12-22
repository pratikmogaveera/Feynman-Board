import React from 'react'
import { useNavigate } from "react-router-dom"


const DashboardCard = ({ doc_id, title, author, content }) => {
    const navigate = useNavigate()
    let total = 0
    let count = content.length
    content.forEach(element => {
        total += element.state
    });
    const percentage = ((total / (count * 4)) * 100).toPrecision(4)

    return (
        // These are the cards that render in the Dashboard page.
        <div
            className={`flex flex-row rounded-md bg-gradient-to-r from-slate-200 via-slate-200 ${!percentage ? "to-slate-200" : percentage >= 75 ? "to-green-500" : percentage >= 50 ? "to-yellow-500" : percentage >= 25 ? "to-blue-500" : "to-red-500"} cursor-pointer justify-between p-2`}
            onClick={() => navigate(`/board/${doc_id}`)}
        >
            <h1 className="text-[18px]">{title}</h1>
            <h1 className="text-[18px]">{percentage}%</h1>
        </div>
    )
}

export default DashboardCard