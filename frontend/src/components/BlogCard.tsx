import { Link } from "react-router-dom"

interface BlogCardProps {
    name: string,
    title: string,
    content: string,
    id: string,
    publishedDate: string
}

export const BlogCard = ({
    name,
    title,
    content,
    id,
    publishedDate
}: BlogCardProps) => {
    return (
        <div className="flex justify-center mt-4">
            <Link to={`/blog/${id}`}>
                <div className="flex flex-col justify-center border-b-2 pb-1 cursor-pointer w-[600px]">
                    {/* Fixed width ensures uniform size */}

                    <div className="flex items-center gap-2">
                        <div>
                            <Avatar name={name} />
                        </div>
                        <Circle />
                        <div className="text-xs pb-0.5">
                            {name}
                        </div>
                        <div className="text-xs pb-0.5 text-gray-500">
                            {publishedDate}
                        </div>
                    </div>

                    <div className="font-bold">
                        {title}
                    </div>

                    <div>
                        {content.slice(0, 100) + "..."}
                    </div>

                    <div className="text-xs font-thin w-max text-gray-500">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"> </div>
}


export function Avatar({ name }: { name: string }) {
    return (
        <div className="m-1 relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="pb-0.5 font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
    )
}