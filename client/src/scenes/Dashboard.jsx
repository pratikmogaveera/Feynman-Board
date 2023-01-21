import React, { useState, useEffect } from 'react'
import styles from '../styles'
import DashboardCard from '../components/DashboardCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Dashboard = () => {
    const username = useSelector(state => state.userInfo.username)
    const navigate = useNavigate()
    const [data, setData] = useState([])


    useEffect(() => {
        // We run getData() function to get Documents from the mongoDB database.
        // This runs only the first time the page loads.
        getData()
    }, [])

    async function getData() {
        // We request the Database for all the documents by the user.
        const { data: result } = await axios.get(`http://localhost:3001/${username}`)
            .then((res) => console.log(res))
        setData(result)
    }

    // If we get back data from the Database we render it using an Array of components or Display "No Data" text.
    const elements = data.length
        ? data.map((item, i) => <DashboardCard key={item.doc_id} {...item} index={i}/>)
        : <p className="w-full h-full flex items-center justify-center text-[42px]">No Data.</p>

    return (
        <div className={`${styles.fullScreen} ${styles.flexCenter} flex-col gap-2 bg-[#1a1a1a]  p-4`}>
            <h1 className="text-white">Dashboard</h1>
            <div className="bg-[#e6e6e6] p-4 flex flex-col gap-4 rounded-md w-full lg:w-[800px] h-[600px]">
                <div className="flex justify-between items-center">
                    <h1 className="text-[24px]">
                        User: <span className="font-bold">{username}</span>
                    </h1>
                    <div className="flex flex-row gap-2">
                        <button
                            className="w-fit h-fit text-[18px] text-white font-semibold bg-blue-500"
                            onClick={() => getData()}
                        >
                            Refresh
                        </button>
                        <button
                            className="w-fit h-fit text-[18px] text-white font-semibold bg-blue-500"
                            onClick={() => navigate('/new-board')}
                        >
                            Add Topic
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2 bg-white w-full h-full overflow-y-auto rounded-md p-2">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default Dashboard