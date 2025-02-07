import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { useBlogs } from "../hooks"

function Blogs() {
    const{loading, blogs} = useBlogs()

    if (loading) {
        return <div>
            <Appbar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    
  return (
    <div>
        <Appbar></Appbar>
        {blogs.map(blog => <BlogCard name={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            id={blog.id}
            publishedDate={"2nd Feb 2024"}
            ></BlogCard>
        )}
        
    </div>
  )
}

export default Blogs

