// import { Avatar } from "./BlogCard"
import { Link, useNavigate } from "react-router-dom"


export const Appbar = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between items-center mx-5 mt-2 border-b-2">
            <div>
             <Link to={"/blogs"}> Medium </Link>
            </div>
            <div>
            <Link to={"/publish"}> 
            <button type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-3 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-3 py-0.5 text-center me-2 mb-1.5 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">New</button>
            </Link>
                <button onClick={() => {
                    localStorage.removeItem("token")
                    navigate("/signin") }}
                    type="button" className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-3 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-3 py-0.5 text-center me-2 mb-1.5 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Sign Out</button>
            </div>
        </div>
    )
}