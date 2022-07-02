import mail from "@sendgrid/mail";

mail.setApiKey(
	'apikey'
);
export default (req, res) => {
	const body = JSON.parse(req.body);
	const message = `
  Name:${body};
  `;

	const data = {
		to: `${body}`,
		from: "abcd@gmail.com",
		subject: "New Web Form Message",
		html: `${body}`,
		template_id: "templateID",
	};
	mail.send(data);
	console.log(body);
	res.status(200).json({ status: "ok" });
};