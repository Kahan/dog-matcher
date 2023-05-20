import { useEffect, useState } from "react"
import Login from "./app/pages/Login"
import Home from "./app/pages/Home"
import { User } from "./app/utils/requests/types"
import { Toaster, toast } from "react-hot-toast"
import api from "./app/utils/requests/api"

function App() {
	const USER_KEY = "user"
	const [user, setUser] = useState<User>()

	useEffect(() => {
		const userJson = localStorage.getItem("user")
		if (userJson) {
			setUser(JSON.parse(userJson))
		}
	}, [])

	useEffect(() => {
		if (user != undefined) {
			localStorage.setItem(USER_KEY, JSON.stringify(user))
		}
	}, [user])

	const handleLogout = async () => {
		;(async (): Promise<void> => {
			try {
				localStorage.removeItem(USER_KEY)
				const res = await api.LogoutReq()
				res === "OK" && setUser(undefined)
				toast("Sad to see you go :(")
			} catch (msg) {
				console.log(msg as string)
			}
		})()
	}

	return (
		<>
			{user == undefined ? (
				<Login setUser={setUser} />
			) : (
				<Home handleLogout={handleLogout} />
			)}
			<Toaster />
		</>
	)
}

export default App
