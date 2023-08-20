import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import DataViewer from "./components/DataViewer";

function App() {
	const iniFormData = {
		symbol:"",
		date:"",
	}
	const iniDataToShow = {
		high:"",
		low:"",
		open:"",
		close:"",
		volume:"",
	}
	const maxDate = new Date().toISOString().split("T")[0];
	const [dataToShow,setDataToShow] = useState(iniDataToShow);
	const [formData, setFormData] = useState(iniFormData);
	const [isLoading,setIsLoading] = useState(false);
	const [message,setMessage] = useState("");
	useEffect(() => {
		if(message === "") return;
		const timer = setTimeout(() => {
			setMessage("");
		}, 3000);
		return () => clearTimeout(timer);
	}, [message]);
	const fillForm = (e) => {
		const {name,value} = e.target;
		if(name === "symbol"){
			setFormData({
				...formData,
				[name]: value.toUpperCase()
			})
			return;
		}
		setFormData({
			...formData,
			[name]: value
		})
	}
	const getData = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if(!formData.symbol || !formData.date){
			setIsLoading(false);
			return;
		}
		axios.post(`http://localhost:5000/api/fetchStockData`, formData)
			.then(res => {
				setDataToShow({...res.data, symbol: formData.symbol, date: formData.date});
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err)
				setIsLoading(false);
				setDataToShow(iniDataToShow);
				setMessage(`${err.response.data}, Please try again with proper value.`);
			});
	}
	return (
		<div className="mt-4 ml-4">
			<form onSubmit={getData} className="flex flex-col">
				<div className="my-1">
					<label htmlFor="symbol">Symbol: </label>
					<input className="px-2 py-1 border rounded-md border-gray-600 outline-none" required placeholder="e.g.:AAPL" autoFocus type="text" name="symbol" value = {formData.symbol} onChange={fillForm} />
				</div>
				<div className="my-1">
					<label htmlFor="date">Date: </label>
					<input className="px-2 py-1 border rounded-md border-gray-600 outline-none" required type="date" name="date" max={maxDate} value={formData.date} onChange={fillForm}/>
				</div>
				<div className="my-1">
					<button type="submit" className="bg-blue-600 px-4 py-2 rounded-md text-white">Get Data</button>
				</div>
			</form>
			<div>
				{isLoading && <Loader/>}
			</div>
			<div>
				{message && <p className="text-red-500 font-bold">{message}</p>}
			</div>
			<div>
				{!isLoading && dataToShow.high && <DataViewer data={dataToShow}/> }
			</div>
		</div>
	);
}

export default App;