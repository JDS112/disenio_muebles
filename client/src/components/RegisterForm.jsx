import {Input, Button, Code, Link} from "@nextui-org/react";
import {useState} from "react"
import {useForm} from "react-hook-form"
import ReCAPTCHA from "react-google-recaptcha"
import icon from "../assets/iconoj.png"
function RegisterForm() {
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm()
    const handleCaptchaChange = (value) => {
    setIsCaptchaVerified(value !== null);
    };
    const onSubmit = handleSubmit(data => {
        console.log(data);
    })
  return (
    <div className="flex flex-col text-center">
        <div className="bg-gray-100 shadow-2xl rounded-2xl pl-10 pr-10">
        <div className="flex items-center justify-center">
            <img src={icon} alt="" className="max-w-sm " />
        </div>
        <h1 className="text-xl text-center font-semibold">Registrate ahora</h1>
        <p className="text-center">Create una cuenta</p>
        <form onSubmit={onSubmit}>
            <Input size="lg" type="text"
            {...register("username",{
            required:{
                value: true,
                message: "Se espera un correo electronico",
            }
            })} label= "Nombre de usuario" className="mt-4"/>
            {
                errors.username?.type ==="required" && <Code color="danger" className="w-full bg-red-500 text-rose-100">{errors.username.message}</Code>
            }
            <Input size="lg" type="email"
            {...register("email",{
            required:{
                value: true,
                message: "Se espera un correo electronico",
            }
            })} label= "Correo electronico" className="mt-4"/>
            {
                errors.email?.type ==="required" && <Code color="danger" className="w-full bg-red-500 text-rose-100">{errors.email.message}</Code>
            }
            <Input size="lg" type="password" {...register("password", {required:{value: true, message:"Se espera una contraseña"}})} label= "Contraseña" className="mt-4"/>
            {
                errors.password?.type ==="required" && <Code color="danger" className="w-full bg-red-500 text-rose-100">{errors.password.message}</Code>
            }
            <ReCAPTCHA className="mt-4 flex items-center justify-center"
                sitekey="6LckVxQpAAAAALcPiAZa01dNeCgxh4MEuenABLgR"
                onChange={handleCaptchaChange}
            />
            <Button color="primary" variant="shadow" type="submit" className="mt-2 w-full h-12">Registrarse</Button>  
        </form>
        <Link isBlock href="/" color="primary" className="my-3">
        ¿Ya tenes una cuenta?
        </Link>
        </div>
        
    </div>
  )
}

export default RegisterForm