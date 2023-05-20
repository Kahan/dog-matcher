import { useEffect, useState } from "react"
import Login from "./app/pages/Login"
import Home from "./app/pages/Home"
import { User } from "./app/utils/requests/types"
import { Toaster } from "react-hot-toast"

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

	return (
		<>
			{user == undefined ? (
				<Login setUser={setUser} />
			) : (
				<Home setUser={setUser} />
			)}
			<Toaster />
		</>
	)
}

export default App
