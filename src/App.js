import React, { useState, useEffect } from "react";
import "./App.css";
import { MdDeleteSweep } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";

function App() {
	const [first, setfirst] = useState(false);
	const [alltodos, settodos] = useState([]);
	const [newtitle, setnewtitle] = useState("");
	const [newdescription, setnewdescription] = useState("");
	const [completedTodos, setCompletedTodos] = useState([]);

	const handleAddtodo = () => {
		let newtodoitem = {
			title: newtitle,
			description: newdescription,
		};
		let updatedtodoarr = [...alltodos];
		updatedtodoarr.push(newtodoitem);
		settodos(updatedtodoarr);
		localStorage.setItem("todolist", JSON.stringify(updatedtodoarr));
	};

	useEffect(() => {
		let savedtodo = JSON.parse(localStorage.getItem("todolist"));
		let savedcompletedtodos = JSON.parse(
			localStorage.getItem("completedtodos")
		);
		if (savedtodo) {
			settodos(savedtodo);
		}
		if (savedcompletedtodos) {
			setCompletedTodos(savedcompletedtodos);
		}
	}, []);

	const handledelete = (index) => {
		let reducedtodo = [...alltodos];
		reducedtodo.splice(index);
		localStorage.setItem("todolist", JSON.stringify(reducedtodo));
		settodos(reducedtodo);
	};

	const handlecomplete = (index) => {
		let now = new Date();
		let dd = now.getDate();
		let mm = now.getMonth() + 1;
		let yyyy = now.getFullYear();
		let h = now.getHours();
		let m = now.getMinutes();
		let s = now.getSeconds();
		let completed = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

		let filtereditems = {
			...alltodos[index],
			completedOn: completed,
		};
		let updatedcompletedarr = [...completedTodos];
		updatedcompletedarr.push(filtereditems);
		setCompletedTodos(updatedcompletedarr);
		handledelete(index);
		localStorage.setItem("completedtodos", JSON.stringify(updatedcompletedarr));
	};

	const handledeletecompletedtodo = (index) => {
		let reducedtodo = [...completedTodos];
		reducedtodo.splice(index);
		localStorage.setItem("completedTodos", JSON.stringify(reducedtodo));
		setCompletedTodos(reducedtodo);
	};

	return (
		<div className="App">
			<h1>My Todo</h1>
			<div className="todo-wrapper">
				<div className="input">
					<div className="input-items">
						<label>Title</label>
						<input
							type="text"
							value={newtitle}
							onChange={(e) => setnewtitle(e.target.value)}
							placeholder="Please enter the task Title !!"
						/>
					</div>
					<div className="input-items">
						<label>Description</label>
						<input
							type="text"
							value={newdescription}
							onChange={(e) => setnewdescription(e.target.value)}
							placeholder="Please enter the task description !!"
						/>
					</div>
					<div className="input-items">
						<button
							type="button"
							onClick={handleAddtodo}
							className="primary-btn">
							Add
						</button>
					</div>
				</div>
				<div className="btn-area">
					<button
						className={`secondary-btn ${first === false ? "active" : ""}`}
						onClick={() => {
							setfirst(false);
						}}>
						Todo
					</button>
					<button
						className={`secondary-btn ${first === false ? "" : "active"}`}
						onClick={() => {
							setfirst(true);
						}}>
						Completed
					</button>
				</div>
				<div className="list">
					{first === false &&
						alltodos.map((item, index) => {
							return (
								<div
									className="list-items"
									key={index}>
									<div>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
									</div>
									<div>
										<MdDeleteSweep
											className="delete"
											onClick={() => handledelete(index)}
										/>
										<HiCheckCircle
											className="check"
											onClick={() => handlecomplete(index)}
										/>
									</div>
								</div>
							);
						})}

					{first === true &&
						completedTodos.map((item, index) => {
							return (
								<div
									className="list-items"
									key={index}>
									<div>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
										<p>
											<small>Completed on: {item.completedOn}</small>
										</p>
									</div>
									<div>
										<MdDeleteSweep
											className="delete"
											onClick={() => handledeletecompletedtodo(index)}
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default App;
