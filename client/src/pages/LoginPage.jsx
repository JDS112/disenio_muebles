import LoginForm from "../components/LoginForm"
import img from "../assets/mueble.gif"

function LoginPage() {
  return (
    <div className="flex w-full h-screen bg-[rgb(43,45,49)]">
        <div className="flex w-full h-screen items-center lg:w-1/2">
          <LoginForm/>
        </div>
        <div className="hidden lg:flex h-full w-1/2 text-center shadow-2xl imgfondo">
          <img src={img} alt="Mueble" />
        </div>
    </div>
  )
}

export default LoginPage