import React, { useState } from "react";
import "./Dashboard.css";
import Sidebar from "./DashboardCompSideBar/Sidebar";
import History from "./DashboardCompHistory/History";
import Progress from "./DashboardCompProgress/Progress";
import GoalPlanner from "./DashboardCompGoalPlanner/GoalPlanner";
import TargetBalance from "./DashboardCompTargetBalance/TargetBalance";
import LimitByCategory from "./DashboardCompLimitByCategory/LimitByCategory";
import TransactionLimits from "./DashboardCompTransactionLimits/TransactionLimits";
import TransferAndSetGoal from "./DashboardCompTransferAndSetGoal/TransferAndSetGoalButton";
import PopupSidebar from "./DashboardCompSideBar/Sidebar";
import axiosClient from "../axios";
import { useEffect } from "react";

function Dashboard() {
	// Mock data for the components (replace with your actual data)

	const limitsData = [
		{ name: "Food", spent: 985.0, limit: 2500.0 },
		{ name: "Shopping", spent: 1415.0, limit: 1500.0 },
		{ name: "Bills", spent: 2134.0, limit: 3000.0 },
		{ name: "Others", spent: 523.0, limit: 1000.0 },
	];

	const goalDetailsData = [
		{ name: "Camera", targetAmount: 24000 },
		{ name: "Others", targetAmount: 150 },
	];

	useEffect(() => {
		document.title = "Dashboard | Wall-et";
	}, []);

	const [currentMoney, setCurrentMoney] = useState();

	axiosClient.get("/user/money").then(({ data }) => {
		// Assuming data structure: { user_id: ..., current_money: ..., message: ... }
		setCurrentMoney(data.current_money);
	});

	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "10% 80% 10%",
					gap: "20px",
					padding: "2px",
				}}
			>
				<div>
					<PopupSidebar />
				</div>
				<div>
					<div className="dashboard-container">
						<div className="dashboard-header">
							<h1>Dashboard</h1>
							<TransferAndSetGoal />
						</div>
						<div className="dashboard-grid">
							<div className="left-column">
								<div className="top-left-area">
									{" "}
									{/* New container for Available and Target Balance */}
									<div className="available-balance-card">
										<h2>Available Balance</h2>
										<p className="available-balance">₱{currentMoney}</p>
									</div>
									<TargetBalance targetBalance={150} remainingToGoal={150} />
								</div>
								<TransactionLimits remaining={100} weeklyLimit={2500} />
								<LimitByCategory limits={limitsData} />
								<GoalPlanner
									progress={80}
									targetBalance={24000}
									currentBalance={19200}
									goalDetails={goalDetailsData}
								/>
							</div>

							<div className="right-column">
								<Progress />
								<History />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
