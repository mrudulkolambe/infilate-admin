import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

const MyDocument = () => {
	// function getValue() {
	// 	let name = document.getElementById("name").value;
	// 	let phoneNumber = document.getElementById("mobilenumber").value;
	// 	let email = document.getElementById("email").value;
	// 	let language = document.getElementById("language").value;
	// 	let link = document.getElementById("link").value;
	// 	console.log(name, phoneNumber, email, language, link);
	// 	document.getElementById("email-form").reset();
	// 	setsuccess(true);
	// 	sendEmail(name, phoneNumber, email, language, link);
	// }
	// async function sendEmail(name, phoneNumber, email, language, link) {
	// 	Email.send({
	// 		Host: "smtp.gmail.com",
	// 		Username: "vikramaa.ads@gmail.com",
	// 		Password: "jsuafulwwzomrldu",
	// 		To: "vikramaa.ads@gmail.com",
	// 		From: email,
	// 		Subject: `${name} Sent You a Message`,
	// 		Body: `
	// 	  <div>
	// 	  Name:${name}<br/> PhoneNumber :${phoneNumber}<br/> Email:${email}<br/> Language:${language}<br/> Link:${link}</div>`,
	// 	}).then((message) => alert("Email Send"));

	// 	await fetch("/api/mail", {
	// 		body: JSON.stringify(email),

	// 		method: "POST",
	// 	});
		return (
			<>
				<Html>
					<Head />
					<body>
						<Main />
						<NextScript />
						<Script
							src="https://smtpjs.com/v3/smtp.js"
						></Script>
					</body>
				</Html>
			</>
		)
	}

	export default MyDocument