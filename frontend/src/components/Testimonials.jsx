const Testimonials = () => {
    const testimonials = [
        {
            name: "John Doe",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/profile_img_1.png"
        },
        {
            name: "Jane Doe",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/profile_img_2.png"
        },
        {
            name: "John Smith",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/profile_img_3.png"
        }
    ];
    return (
        <div className="flex flex-col items-center justify-center mt-8 sm:mt-18 px-4 sm:px-0">
            <h1 className="text-2xl mb-2 sm:mb-8 sm:text-4xl font-bold bg-gradient-to-r from-[#353535] to-[#9B9B9B] bg-clip-text text-transparent p-2">Customer Testimonials</h1>
            <div className="flex flex-col sm:flex-row gap-4">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg bg-white">
                        <span className="text-2xl text-[#62577B] block">❞</span>
                        <p className="text-gray-700">{testimonial.text}</p>
                        <div className="flex gap-3 items-center mt-4">
                            <img src={testimonial.image} alt="Profile" className="w-8 h-8 rounded-full" />
                            <div>
                                <p className="text-gray-500">{testimonial.name}</p>
                                <p className="text-gray-400 text-sm">Customer</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonials;