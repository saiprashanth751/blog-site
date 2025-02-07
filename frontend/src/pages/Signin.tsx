import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

function Signin() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin"></Auth>
        </div>
        <div className="hidden lg:block">
          <Quote></Quote>
        </div>
      </div>
    </>
  )
}

export default Signin