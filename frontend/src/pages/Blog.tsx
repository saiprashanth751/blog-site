import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { Appbar } from "../components/Appbar"
import { Spinner } from "../components/Spinner"


function Blog() {
  const { id } = useParams()
  const { loading, blog } = useBlog({
    id: id || ""
  })

  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">

          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>

    )
  }

  return (
    <div>
      <Appbar></Appbar>
      {blog && <FullBlog blog={blog}></FullBlog>}
    </div>
  )
}

export default Blog