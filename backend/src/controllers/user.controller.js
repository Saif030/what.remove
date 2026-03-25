import {Webhook} from 'svix';
import { User } from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';

const userData = (req, res) => {
    return res.json(new ApiResponse(200, "user data", null));
}

const clerkWebhook = async (req, res) => {

    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const event = await whook.verify(JSON.stringify(req.body), {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        });

        const { data , type } = event;

        if(type === "user.created"){
            const { id , email_addresses , image_url , first_name , last_name } = data;

            if (!email_addresses || email_addresses.length === 0) {
                return res.status(400).json({message: "No email address provided!"});
            }

            const newUser = await User.create({
                clerkId: id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
                photo: image_url
            })

            console.log("User created successfully in database:", newUser);

            if(newUser){
                return res.status(200).json({
                    success : true,
                    message : "User created successfully in database!"
                })
            }

        }

        if(type === "user.updated"){
            const { id , email_addresses , image_url , first_name , last_name } = data;

            const userUpdate = await User.findOneAndUpdate(
            {
                clerkId : id
            },
            {
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
                photo: image_url
            })

            console.log("User updated successfully in database!");

            if(userUpdate){
                return res.status(200).json({
                    success : true,
                    message : "User updated successfully in database!"
                })
            }
        }

        if(type === "user.deleted"){
            const  { id } = data;
            const userDelete = await User.findOneAndDelete({
                clerkId : id
            })
            if(!userDelete){
                return res.status(500).json({
                    success : false,
                    message : "Failed to delete user in database!"
                })
            }
        }

        return res.status(200).json({
            success: true,
            message: "Webhook work completed successfully!"
        });

    }catch(err){
        console.error(`Error message: ${err.message}`);
        return res.status(400).json({message: err.message || "Webhook verification failed!"});
    }

}

const userCredits = async (req,res) => {
    const userId = req.auth().userId;

    if(!userId){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }

    try{
        const user = await User.findOne({clerkId : userId});

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found!"
            })
        }
        return res.status(200).json({
            success : true,
            credits : user.credits
        })
    }catch(err){
        console.error(`Error fetching user credits: ${err.message}`);
        return res.status(500).json({
            success : false,
            message : "Failed to fetch user credits!"
        })
    }
}

export { clerkWebhook , userData , userCredits };