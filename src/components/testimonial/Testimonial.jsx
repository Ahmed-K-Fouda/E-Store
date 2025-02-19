function Testimonial() {
  const testimonialsData = [
    {
      name: "Ahmed Khaled Fouda",
      role: "Senior Product Designer",
      image:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1738825624~exp=1738829224~hmac=bbf35a16a25a28bbbb049094cd8e9a097ddcd9908fba0d52713b04ecdee6b9d9&w=1060",
      text: "Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy Adaptogen squid fanny pack vaporware. Edison bulb retro cloud bread echo park",
    },
    {
      name: "Sarah Saad Safy",
      role: "UI Developer",
      image:
        "https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg?t=st=1738825862~exp=1738829462~hmac=2e3e08b62b7bfde12f1eee314928c426c04c49d7410b67597d31227eaeb05227&w=1060",
      text: "Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy",
    },
    {
      name: "Hady Mansour Rageb",
      role: "CTO",
      image:
        "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Adaptogen squid fanny pack vaporware. Edison bulb retro cloud bread echo park Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar",
    },
  ];
  return (
    <section className="text-gray-600 body-font mb-10">
      <div className="container px-5 py-10 mx-auto">
        <h1 className="text-center text-3xl font-bold text-black">
          Testimonial
        </h1>
        <h2 className="text-center text-2xl font-semibold mb-10">
          What our <span className="text-red-700">customers</span> are saying
        </h2>
        <div className="flex flex-wrap -m-4">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={testimonial.image}
                />
                <p className="leading-relaxed">{testimonial.text}</p>
                <span className="inline-block h-1 w-10 rounded bg-red-900 mt-6 mb-4" />
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                  {testimonial.name}
                </h2>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
