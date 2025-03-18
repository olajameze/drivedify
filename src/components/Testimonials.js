import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    content: "DrivEdify has completely transformed how I manage my driving school. The scheduling and progress tracking features are game-changers.",
    author: "Sarah Johnson",
    role: "Driving Instructor",
    location: "Manchester",
    image: "/sarah.avif"
  },
  {
    content: "The AI-powered insights have helped me provide better, more targeted instruction to my students. It's like having a digital assistant.",
    author: "James Wilson",
    role: "Senior Instructor",
    location: "London",
    image: "/jimmy.avif"
  },
  {
    content: "The mock test feature has significantly improved my students' pass rates. It's an invaluable tool for exam preparation.",
    author: "Emma Thompson",
    role: "Driving School Owner",
    location: "Birmingham",
    image: "/emma.avif"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
  
    return () => {
      clearInterval(timer);
    };
  }, []);
  

  const handleImageError = (index) => {
    setImgError(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Driving Instructors
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Here's what instructors are saying about DrivEdify
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="relative h-[400px]">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  activeIndex === index && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <blockquote>
                        <div className="relative">
                          <svg
                            className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-primary-100"
                            fill="currentColor"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                          >
                            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                          </svg>
                          <p className="relative text-xl text-gray-600">{testimonial.content}</p>
                        </div>
                        <div className="mt-8 flex items-center justify-center">
                          <div className="flex-shrink-0">
                            {imgError[index] ? (
                              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-600 font-medium">
                                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            ) : (
                              <div className="h-14 w-14 rounded-full overflow-hidden relative">
                                <Image
                                  src={testimonial.image}
                                  alt={testimonial.author}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 3.5rem, 3.5rem"
                                  onError={() => handleImageError(index)}
                                />
                              </div>
                            )}
                          </div>
                          <div className="ml-4 text-left">
                            <div className="text-base font-medium text-gray-900">{testimonial.author}</div>
                            <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.location}</div>
                          </div>
                        </div>
                      </blockquote>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10 flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                  activeIndex === index ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 