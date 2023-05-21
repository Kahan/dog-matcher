import { FC, useEffect, useState } from "react"
import reactLogo from "../../assets/Logo.svg"
import Card from "../components/Card"
import { Dog, Dogs, DogsSearchFilter } from "../utils/requests/types"
import api from "../utils/requests/api"
import pageNext from "../../assets/page-next.svg"
import pagePrev from "../../assets/page-prev.svg"
import CustomSelect from "../components/CustomSelect"
import dogIcon from "../../assets/dogIcon.svg"
import MatchCard from "../components/MatchCard"
import { IconSortAZ, IconSortZA, IconTrash } from "@tabler/icons-react"
import { toast } from "react-hot-toast"

interface HomeProps {
	handleLogout: Function
	resetUser: Function
}

const Home: FC<HomeProps> = ({ handleLogout, resetUser }) => {
	const PAGE_SIZE = 12

	const [page, setPage] = useState<number>(0)
	const [totalPages, setTotalPages] = useState<number>(0)
	const [dogs, setDogs] = useState<Dogs>([])
	const [selectedDogs, setSelectedDogs] = useState<string[]>([])
	const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
	const [match, setMatch] = useState<Dog | undefined>()
	const [sort, setSort] = useState<string>("asc")

	const toggleSort = () => {
		if (sort === "asc") {
			setSort("desc")
		} else {
			setSort("asc")
		}
	}

	const getMatch = async (): Promise<void> => {
		try {
			const dogSearchResult = await api.dogMatchReq(selectedDogs)
			setMatch(dogs.find((d) => d.id === dogSearchResult.match))
			toast.success("Found a match!")
		} catch (error) {
			// console.log(error)
			toast.error("Error finding a match :(")
		}
	}

	// Reset on clear selection and providing a match
	const resetMatch = () => {
		setMatch(undefined)
		setSelectedDogs([])
	}

	const searchDogs = async (): Promise<void> => {
		// filter options
		const data: DogsSearchFilter = {
			from: page * PAGE_SIZE,
			size: PAGE_SIZE,
			sort: `breed:${sort}`,
			breeds: selectedBreeds,
		}

		try {
			const dogSearchResult = await api.searchDogsReq(data)
			setTotalPages(Math.round(dogSearchResult.total / PAGE_SIZE))
			const dogResult = await api.getDogsReq(dogSearchResult.resultIds)
			setDogs(dogResult)
		} catch (error: any) {
			// console.log(error)
			toast.error(error)
		}
	}

	// Setting up the callback when the session has expired
	useEffect(() => {
		api.expiredSessionHandler(() => {
			resetUser()
		})
	})

	useEffect(() => {
		searchDogs()
	}, [page, selectedBreeds, location, sort])

	return (
		<>
			<div className="m-8 flex flex-col">
				{/* Header */}
				<div className="flex justify-between md:mx-16 lg:mx-20">
					<img src={reactLogo} className="w-[40px] sm:w-[64px]" alt="logo" />
					<button
						type="button"
						onClick={() => handleLogout()}
						className="text-accent sm:text-lg md:text-2xl"
					>
						Logout
					</button>
				</div>

				{/* Content */}
				<div className="flex flex-col align-center mt-16">
					<p className="font-title text-center md:text-2xl">
						Adopting has never been
					</p>
					<h1 className="font-title text-title text-4xl font-extrabold text-center md:text-6xl">
						SO FUN
					</h1>
					<h5 className="text-center font-normal md:text-2xl">
						Select your best choices and we will find you a match!
					</h5>
				</div>

				{/* Results and filter */}
				<div className=" relative flex flex-col my-9 self-stretch gap-6 md:mx-16 lg:mx-20">
					<div className="flex justify-center gap-4">
						<div className="flex items-center justify-center gap-4">
							<CustomSelect setSelectedBreeds={setSelectedBreeds} />
							<button
								onClick={toggleSort}
								className="bg-white rounded-md shadow-sm border-2 border-zinc-200 hover:border-zinc-400 transition-colors bg-opacity-60 p-2
                                "
							>
								{sort === "asc" ? (
									<IconSortAZ size={24} color="#300d38" />
								) : (
									<IconSortZA size={24} color="#300d38" />
								)}
							</button>
						</div>
					</div>
					<div className="w-6 h-1 bg-title rounded-sm self-center sm:w-14" />
					<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-3 md:gap-6">
						{dogs.map((dog) => (
							<Card
								key={dog.id}
								dog={dog}
								selected={selectedDogs}
								setSelectedDogs={setSelectedDogs}
							/>
						))}
					</div>
					{/* Page naviigators */}
					<div className="flex gap-4 justify-center items-center">
						<button
							onClick={() => setPage((page) => page - 1)}
							disabled={page == 0}
							className="disabled:opacity-80"
						>
							<img src={pagePrev} alt="previous page" />
						</button>
						<p className="text-title">
							{(page + 1).toString()} / {totalPages.toString()}
						</p>
						<button
							onClick={() => setPage((page) => page + 1)}
							disabled={page + 1 == totalPages}
							className="disabled:opacity-80"
						>
							<img src={pageNext} alt="next page" />
						</button>
					</div>
					{selectedDogs.length > 0 && (
						<div className="z-20 fixed right-8 left-8 bottom-6 flex gap-4 justify-between sm:justify-end md:right-24 lg:right-28">
							<button
								title="Match"
								onClick={resetMatch}
								className="h-14 aspect-square shadow-md grid items-center p-3 justify-center  bg-red-100 hover:bg-red-200 transition-all ease-in-out rounded-xl
						"
							>
								<IconTrash size={24} />
							</button>
							<button
								title="Match"
								onClick={getMatch}
								className="h-14 shadow-md flex gap-3 p-3 items-center justify-between  bg-purple-100 hover:bg-purple-200 transition-all ease-in-out rounded-xl
							"
							>
								<img className="w-8" src={dogIcon} alt="Dog icon" />
								<p className="text-lg">{selectedDogs.length}</p>
							</button>
						</div>
					)}
				</div>
			</div>
			{match && (
				<div className="bg-gray-950 fixed inset-0 bg-opacity-80 z-50 grid place-items-center px-5">
					<MatchCard match={match} resetMatch={resetMatch} />
				</div>
			)}
		</>
	)
}

export default Home
