import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Phone } from "../Icons";
import styles from "./SignInComp.module.css";
import axiosClient from "../../axios";

const SignInComp = ({ navigateTo }) => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState(null);

	const contactNumberRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	/**
	 * Handles the form submission for user login.
	 * Prevents default form submission, constructs payload, and sends it to the backend.
	 * @param {Event} e - The form submission event.
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors(null);

		const contactValue = contactNumberRef.current.value.trim();
		const passwordValue = passwordRef.current.value.trim();

		if (!contactValue || !passwordValue) {
			setErrors({ general: ["Contact number and password are required."] });
			return;
		}

		const payload = {
			identifier: contactValue,
			password: passwordValue,
		};

		try {
			await axiosClient.get("/sanctum/csrf-cookie");
			const { data } = await axiosClient.post("/login", payload);

			localStorage.setItem("ACCESS_TOKEN", data.token);
			if (data.user && data.user.id) {
				localStorage.setItem("user_id", data.user.id);
			}
			navigate("/");
			console.log("Login successful:", data);
		} catch (error) {
			// Handle login errors
			if (error.response && error.response.status === 422) {
				// Validation errors from Laravel
				setErrors(error.response.data.errors);
				console.error("Validation errors:", error.response.data.errors);
			} else if (error.response && error.response.status === 419) {
				// Specifically handle the 419 CSRF error for clearer debugging
				setErrors({
					general: [
						"Session expired or CSRF token mismatch. Please refresh the page and try again.",
					],
				});
				console.error("CSRF Token Mismatch Error (419):", error);
			} else if (error.response && error.response.status === 401) {
				// Handle unauthorized (incorrect credentials) error
				setErrors({
					general: ["Invalid contact number or password. Please try again."],
				});
				console.error("Login failed: Invalid credentials.", error);
			} else {
				// Other types of errors (network, server, etc.)
				console.error("Login failed:", error);
				setErrors({
					general: ["An unexpected error occurred. Please try again."],
				});
			}
		}
	};

	return (
		<div className={styles.authContainer}>
			<h1 className={styles.authTitle}>Welcome Back!</h1>
			<p className={styles.authSubtitle}>Please sign in to continue.</p>
			<form className={styles.authForm}>
				{errors && (
					<div className={styles.errorContainer}>
						{Object.keys(errors).map((key) => (
							<p key={key} className={styles.errorMessage}>
								{errors[key][0]}{" "}
							</p>
						))}
					</div>
				)}

				<div className={styles.inputGroup}>
					<span className={styles.inputIcon}>
						<Mail />
					</span>
					<input
						ref={emailRef}
						type="email"
						placeholder="Email Address (Optional)"
						className={styles.authInput}
					/>
				</div>
				<div className={styles.inputGroup}>
					<span className={styles.inputIcon}>
						<Phone />
					</span>
					<input
						ref={contactNumberRef}
						type="text"
						placeholder="Contact Number"
						className={styles.authInput}
						required
					/>
				</div>
				<div className={styles.inputGroup}>
					<span className={styles.inputIcon}>
						<Lock />
					</span>
					<input
						ref={passwordRef}
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						className={styles.authInput}
						required
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className={styles.passwordToggle}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						<span className={styles.passwordToggleIcon}>
							{showPassword ? <EyeOff /> : <Eye />}
						</span>
					</button>
				</div>
				<button
					type="submit"
					className={styles.authButton}
					onClick={handleSubmit}
				>
					Sign In
				</button>
			</form>
			<div className={styles.authLinks}>
				<button
					onClick={() => navigateTo("signUp")}
					className={styles.authLink}
				>
					Don't have an account yet? Sign Up
				</button>
				<button
					onClick={() => navigateTo("forgotPassword")}
					className={styles.authLink}
				>
					Forgot Password?
				</button>
			</div>
		</div>
	);
};

export default SignInComp;
