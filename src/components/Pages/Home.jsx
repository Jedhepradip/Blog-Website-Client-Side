import React, { useState } from 'react'
import "./Home.css"
import { AiOutlineDown} from 'react-icons/ai';
import Blog from './Blog';
const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(1);
  const [faqData, setfaq] = useState([])

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 1 ? 3 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 3 ? 1 : prevSlide + 1));
  };

  const handleDotClick = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  const [openIndex, setOpenIndex] = useState(null);
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  const Faq = [
    {
        question: "What is your blog about?", answer: "Our blog covers a wide range of topics including [insert topics]. We aim to provide valuable insights, tips, and information on these subjects."
    },
    {
        question: "How often do you update your blog?", answer: "We typically update our blog [insert frequency], but this may vary depending on the content schedule and current events."
    },
    {
        question: "Can I contribute to your blog", answer: "Yes, we welcome guest contributions! Please check out our guidelines [link to guidelines page] for more information on how to submit your content."
    },
    {
        question: "If I focus on SEO content, will my blog sound crappy?", answer: "Maybe! If you remember the old days of SEO content, you'll recall 300-word posts where writers used long keyword phrases like 'pest control in northern Kansas City' ten times throughout the article"
    },
    {
        question: "How long does it take for blogging to start working?", answer: "It varies! It largely depends on how much existing influence you have and how much money you're willing to spend"
    },
    {
        question: "How long does it take for blogging to pay for itself?", answer: "What about the break-even point? Blogging is an investment between paying for content, images, development work, and management. "
    },
    // {
    //     question: "How can I check my current blog posts to see if they're any good?", answer: "What you're looking for is called a 'content audit.' A content audit looks at your entire blog and analyzes every post."
    // },
    // {
    //     question: "I get a ton of outreach emails for my blog. What should I do with them?", answer: "One of the essential elements of SEO is links pointing to your site from other, better websites. Everyone who has a blog with any traffic at all will eventually start getting these emails"
    // },
    // {
    //     question: "How do I steer my visitors towards becoming customers?", answer: "Know why your users are finding you. What do they want when they search? What are they hoping to find? Provide that to them, and you will build trust and authority with them"
    // },
];



  return (
    <div>
      <div className="carousel mt-96">
        <ul className="slides">
          <input type="radio" name="radio-buttons" id="img-1" checked={currentSlide === 1} readOnly />
          <li className="slide-container">
            <div className="slide-image">
              <img src="https://as2.ftcdn.net/v2/jpg/08/12/75/39/1000_F_812753919_EDfGcM93UCQIf76LYr8jO8KMQ2c3Gmlk.jpg" alt="slide 1" />
            </div>
            <div className="carousel-controls">
              <label htmlFor="img-3" className="prev-slide" onClick={handlePrevSlide}>
                <span>&lsaquo;</span>
              </label>
              <label htmlFor="img-2" className="next-slide" onClick={handleNextSlide}>
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-2" checked={currentSlide === 2} readOnly />
          <li className="slide-container">
            <div className="slide-image">
              <img src="https://as1.ftcdn.net/v2/jpg/08/02/62/12/1000_F_802621218_tH5zZo2oxpVucCO4WIZGI01kaOj17qb7.jpg" alt="Slide 2" />
            </div>
            <div className="carousel-controls">
              <label htmlFor="img-1" className="prev-slide" onClick={handlePrevSlide}>
                <span>&lsaquo;</span>
              </label>
              <label htmlFor="img-3" className="next-slide" onClick={handleNextSlide}>
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
          <input type="radio" name="radio-buttons" id="img-3" checked={currentSlide === 3} readOnly />
          <li className="slide-container">
            <div className="slide-image">
              <img src="https://as1.ftcdn.net/v2/jpg/06/04/66/94/1000_F_604669413_db2ER9fKj8fOjmPmx95u7ebskVd05qub.jpg" alt="Slide 4" />
            </div>
            <div className="carousel-controls">
              <label htmlFor="img-4" className="prev-slide" onClick={handlePrevSlide}>
                <span>&lsaquo;</span>
              </label>
              <label htmlFor="img-2" className="next-slide" onClick={handleNextSlide}>
                <span>&rsaquo;</span>
              </label>
            </div>
          </li>
        </ul>
      </div>
        <div className="flex w-full h-auto flex-wrap items-center justify-center">

          <Blog/>
          
        </div>
      {/* FAQS */}

      <div
        className="relative font-serif w-[100%] bg-white px-6 pt-2 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10 mb-[50px]">
        <div className="mx-auto px-5">
          <div className="flex flex-col items-center">
            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">FAQ</h2>
            <p className="mt-3 text-lg text-neutral-500 md:text-xl">Frequenty asked questions
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
            {Faq.map((val, index) => (
              <div key={index} className="py-5">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    <span>{val.question}</span>
                    <span className="transition group-open:rotate-180">
                      <AiOutlineDown className='icon'/>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-neutral-600">{val.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
