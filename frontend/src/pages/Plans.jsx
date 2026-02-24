const Plans = () => {
    const plans = [
        {
            name: "Basic",
            price: "$9.99",
            description: "Perfect for small businesses",
            credits: "100 credits",
        },
        {
            name: "Pro",
            price: "$19.99",
            description: "Great for growing businesses",
            credits: "500 credits",
        },
        {
            name: "Enterprise",
            price: "$29.99",
            description: "Best for large businesses",
            credits: "1000 credits",
        },
    ];

    return (
        <div className="sm:w-7xl bg-gray-100 w-full mx-auto min-h-[79vh] flex flex-col items-center justify-center sm:mt-0 mt-4">
            <h1 className="text-lg px-10 py-2 border-1 border-black rounded-full">Our Plans</h1>
            <p className="text-3xl mt-3 sm:text-4xl font-bold p-2 text-center bg-gradient-to-r from-[#353535] to-[#9B9B9B] bg-clip-text text-transparent">Choose the plan that’s right for you</p>
            <div className="flex flex-col sm:flex-row gap-6 p-4">
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-white w-80 rounded-2xl p-8">
                        <img src="/favicon.svg" alt="logo" className="w-8 h-8 mb-4" />
                        <h2 className="text-xl font-medium">{plan.name}</h2>
                        <p className="text-gray-500">{plan.description}</p>
                        <p className="text-3xl font-medium mt-6">{plan.price} <span className="text-gray-500 text-lg font-normal">/ {plan.credits}</span></p>
                        <button className="mt-10 w-full bg-black text-white px-6 py-2 rounded-lg cursor-pointer">Get Started</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Plans;