const userData = (req, res) => {
    res.json({message: "user data"});
}

const clerkWebhook = (req, res) => {
    res.json({message: "clerk webhook"});
}

export { clerkWebhook , userData };