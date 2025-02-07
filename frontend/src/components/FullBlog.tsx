import {Blog} from "../hooks/index"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: Blog}) => {
    return( 
        <div className="grid h-screen grid-cols-12">
  <div className="col-span-9 m-11 max-w-full bg-white">
    <div className="max-w-3xl bg-white text-5xl font-bold">{blog.title}</div>
    <div className="mb-4 mt-2 text-gray-500">Posted on August 24, 2023</div>
    <div className="mt-2">{blog.content}</div>
  </div>

  <div className="col-span-3 mt-24 bg-white">
    <div className="font-semibold text-gray-700">Author</div>

    <div className="mt-2 flex items-center gap-2">
      <div><Avatar name={blog.author.name}></Avatar></div>
      <div className="font-bold">{blog.author.name}</div>
    </div>
  </div>
</div>

    )
}