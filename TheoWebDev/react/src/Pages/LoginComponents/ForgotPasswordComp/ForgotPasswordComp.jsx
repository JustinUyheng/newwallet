import React, { useState } from "react";
import { Eye, EyeOff, Mail, KeyRound } from "../Icons";
import styles from "./ForgotPasswordComp.module.css";
import axiosClient from "../../axios";

const ForgotPasswordComp = ({ navigateTo }) => {
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
	const [message, setMessage] = useState(null);
	const [errors, setErrors] = useState(null);

	const handleSendLink = async (e) => {
		e.preventDefault();
		setErrors(null);
		setMessage(null);
		try {
			// await axiosClient.get("/sanctum/csrf-cookie");
			await axiosClient.post("/password/email", { email });
			setMessage("Reset link sent. Check your email.");
		} catch (err) {
			setErrors("Unable to send reset link.");
		}
	};

	const handleReset = async (e) => {
		e.preventDefault();
		setErrors(null);
		setMessage(null);

		if (!email.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
			setErrors("Please fill in all fields.");
			return;
		}
		if (newPassword !== confirmNewPassword) {
			setErrors("New passwords do not match.");
			return;
		}

		const urlToken = new URLSearchParams(window.location.search).get("token"); // expect token from email link
		if (!urlToken) {
			setErrors("Missing reset token. Please use the link from your email.");
			return;
		}

		try {
			await axiosClient.post("/password/reset", {
				email,
				token: urlToken,
				password: newPassword,
				password_confirmation: confirmNewPassword,
			});
			setMessage("Password reset successfully. You can now sign in.");
			navigateTo("signIn");
		} catch (err) {
			setErrors("Unable to reset password.");
		}
	};

	return (
		<div>
			<h1 className={styles.authTitle}>Reset Password</h1>
			{message && <div className={styles.success}>{message}</div>}
			{errors && <div className={styles.errorContainer}>{errors}</div>}

			<form onSubmit={handleSendLink} className={styles.authForm}>
				<div className={styles.inputGroup}>
					<span className={styles.inputIcon}>
						<Mail />
					</span>
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={styles.authInput}
					/>
				</div>
				<button type="submit" className={styles.authButton}>
					Send Reset Link
				</button>
			</form>

			<form
				onSubmit={handleReset}
				className={styles.authForm}
				style={{ marginTop: 16 }}
			>
				<div className={styles.inputGroup}>
					<span className={styles.inputIcon}>
						<KeyRound />
					</span>
					<input
						type={showNewPassword ? "text" : "password"}
						placeholder="New Password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						className={styles.authInput}
					/>
					<button
						type="button"
						onClick={() => setShowNewPassword(!showNewPassword)}
						className={styles.passwordToggle}
					>
						{showNewPassword ? <EyeOff /> : <Eye />}
					</button>
				</div>
				<div className={styles.inputGroup}>
					<input
						type={showConfirmNewPassword ? "text" : "password"}
						placeholder="Confirm New Password"
						value={confirmNewPassword}
						onChange={(e) => setConfirmNewPassword(e.target.value)}
						className={styles.authInput}
					/>
					<button
						type="button"
						onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
						className={styles.passwordToggle}
					>
						{showConfirmNewPassword ? <EyeOff /> : <Eye />}
					</button>
				</div>
				<button type="submit" className={styles.authButton}>
					Reset Password
				</button>
			</form>

			<div className={styles.authLinks}>
				<button
					onClick={() => navigateTo("signIn")}
					className={styles.authLink}
				>
					Back to Sign In
				</button>
			</div>
		</div>
	);
};

export default ForgotPasswordComp;
