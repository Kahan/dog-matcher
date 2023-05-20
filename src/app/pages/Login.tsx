import { FC, useState } from "react"
import reactLogo from "../../assets/Logo.svg"
import reactIllustration from "../../assets/Illustration.svg"
import InputComponent from "../components/InputComponent"
import Button from "../components/Button"
import { User } from "../utils/requests/types"
import api from "../utils/requests/api"
import { toast } from "react-hot-toast"

interface LoginProps {
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const Login: FC<LoginProps> = ({ setUser }) => {
	const [name, setName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [errorMessage, setErrorMessage] = useState<string>("")

	// Helper method
	const checkValidEmail = (email: string): boolean => {
		return /^\S+@\S+\.\S+$/.test(email)
	}

	// Handle input change
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.name === "name") {
			setName(e.target.value)
		} else {
			setEmail(e.target.value)
		}
	}

	// Handle form submit
	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		if (!checkValidEmail(email)) {
			setErrorMessage("Please input a valid email")
		}

		// Authenticate
		void (async () => {
			try {
				const res = await api.LoginReq(name, email)
				if (res) {
					toast.success("Welcome Back!")
					setUser({ name, email })
				}
			} catch (msg) {
				setErrorMessage(msg as string)
				toast.error("Error loggin in :(")
			}
		})()

		setTimeout(() => {
			setErrorMessage("")
		}, 2000)
	}

	return (
		<div>
			<div className="flex justify-center align-center py-6">
				<img src={reactLogo} alt="Logo" />
			</div>
			<div className="flex justify-center flex-col align-center mx-12 sm:mx-20  md:flex-row">
				{/* Login form */}
				<div className="flex flex-col gap-6 md:basis-1/2 lg:basis-2/5">
					<div>
						<p className="font-body font-sm text-body text-center md:text-2xl md:text-left">
							Welcome,
						</p>
						<h1 className="font-title text-title font-md text-center md:text-5xl md:text-left">
							Let’s find a lucky dog for you.
						</h1>
					</div>
					<div className="h-[2px] w-8 bg-title rounded-sm self-center md:self-start md:h-1" />
					<form
						autoComplete="off"
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 md:max-w-[80%]"
					>
						<InputComponent
							label="name"
							value={name}
							type="text"
							handleChange={handleChange}
						/>
						<InputComponent
							label="email"
							value={email}
							type="email"
							handleChange={handleChange}
						/>
						<p className="text-sm self-end underline cursor-pointer">
							Did you forget your password?
						</p>
						<Button type="submit" text="Login" />
						<p
							className={`text-sm self-end text-red-500 opacity-0 transition-opacity ease-linear ${
								errorMessage && "opacity-100"
							}`}
						>
							{errorMessage}
						</p>
					</form>
				</div>
				{/* Illustration */}
				<div className="md:basis-1/2">
					<img className="h-full" src={reactIllustration} alt="petting a dog" />
				</div>
			</div>
		</div>
	)
}

export default Login
