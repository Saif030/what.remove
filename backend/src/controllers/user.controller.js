import {Webhook} from 'svix';
import User from '../models/user.model.js';

const userData = (req, res) => {
    res.json({message: "user data"});
}

const clerkWebhook = async (req, res) => {

    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const event = await whook.verify(JSON.stringify(req.body), {
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        });
        console.log( "Webhook received successfully!");

        const { data , type } = event;

        if(type === "user.created"){
            const { id , email_addresses , image_url , first_name , last_name } = data;

            const newUser = await User.create({
                clerkId: id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
                imageUrl: image_url
            })

            if(!newUser){
                return res.status(500).json({
                    success: false,
                    message: "Failed to create user in database!"
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
                imageUrl: image_url
            })

            if(!userUpdate){
                return res.status(500).json({
                    success : false,
                    message : "Failed to update user in database!"
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
        console.log(`Error: ${err.message}`);
        return res.status(400).json({message: "Invalid webhook signature!"});
    }

}

export { clerkWebhook , userData };