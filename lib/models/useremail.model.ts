import mongoose from "mongoose";

const UserEmailSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		id: { type: String, required: true },
	},
	{ timestamps: true }
);

const UserEmails =
	mongoose.models.User_Emails ||
	mongoose.model("User_Emails", UserEmailSchema);

export default UserEmails;
