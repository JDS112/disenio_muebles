import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import ReCAPTCHA from "react-google-recaptcha"
import email from "../assets/Email.png"
import password from "../assets/Password.png"
import { useContext } from "react"
import { AppContext } from "../context/AppContext.jsx"
import {loginReq} from "../api/userApi.js"
import Cookies from "js-cookie"
function LoginForm() {
    const history = useNavigate()
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm()
    const handleCaptchaChange = (value) => {
    setIsCaptchaVerified(value !== null);
    };

    const context = useContext(AppContext);
    const onSubmit = async data => {
        
        try {
            if(!isCaptchaVerified) {
                alert("Por favor, verifique el CAPTCHA")
                return
            }
            const response = await loginReq(data)
            if(response.status === 200){
                console.log("Usuario identificado")
                const rol = response.data.rol
                Cookies.set("dataUser", JSON.stringify(response.data), {expires : 7})
                context.setUser(response.data)
                switch (rol) {
                    case "recepcionista":
                        history("/recepcionista")
                        break;
                    case "admin":
                        history("/admin/inicio")
                        break;
                    case "carpintero":
                        history("/carpintero")
                        break;
                    case "carpinteroLabrado":
                        history("/carpintero")
                        break;
                    case "jefeCarpintero":
                        history("/jefe")
                        break;
                    default:
                        
                        break;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="w-screen flex flex-col">
        <div className="shadow-xl w-2xl pl-10 pr-10 pt-5 pb-5 rounded-xl mr-40 ml-40 z-40">
        
        <h1 className="text-4xl text-center font-semibold text-white">Bienvenido de vuelta</h1>
        <p className="text-center text-white animate-pulse">Inicia sesion para continuar</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="" className="text-white mt-4">Correo electronico</label>
            <div className="relative">
                <input type="email" className="w-full p-4 bg-transparent text-white border-b-4 border-white rounded-sm outline-none focus:scale-105 duration-500 text-center" placeholder="Email"
                {...register("email",{
                    required:{
                        value: true,
                        message: "El email es requerido"
                    }
                })}/>
                <img src={email} className="w-10 h-10 absolute top-1/2 transform -translate-y-1/2 left-0"/>
                {
                    errors.email?.type ==="required" && <p className="text-red-500 text-center">{errors.email.message}</p>
                }
            </div>
            
            <label htmlFor="" className="text-white mt-4">Contraseña</label>
            <div className="relative">
                <input type="password" className="w-full p-4 bg-transparent text-white border-b-4 border-white rounded-sm outline-none focus:scale-105 duration-500 text-center" placeholder="Contraseña"
                {...register("password",{
                    required:{
                        value: true,
                        message: "La contraseña es requerido"
                    }
                })}/>
                <img src={password} className="w-10 h-10 absolute top-1/2 transform -translate-y-1/2 left-0 " />
                {
                    errors.password?.type ==="required" && <p className="text-red-500 text-center">{errors.password.message}</p>
                }
            </div>
            
            
            <ReCAPTCHA className="mt-4 flex items-center justify-center"
                sitekey="6LckVxQpAAAAALcPiAZa01dNeCgxh4MEuenABLgR"
                onChange={handleCaptchaChange}
            />
            <button type="submit" className="text-white p-4 bg-blue-600 rounded-xl mt-2 hover:bg-blue-700 hover:text-gray-200 duration-300 focus:scale-95 shadow-xl">Iniciar sesion</button> 
        </form>
        
        </div>
        
    </div>
  )
}

export default LoginForm