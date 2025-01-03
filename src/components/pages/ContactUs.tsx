import React from 'react';
import ContactFormSection from '../core/AboutUs/ContactFormSection';
import ReviewSlider from '../common/ReviewSlider';
import Footer from '../common/Footer';
import { FOOTER_INFO_DATA } from '../../data/footer-links';

const ContactUs: React.FC = () => {
  return (
    <div className="mb-5">
      <div className=" mt-[30px] lg:mt-[100px] lg:w-11/12 max-w-maxContent text-center flex flex-col lg:ml-[15%] lg:mb-[2%]">
        {/* section 1 */}
        <section>
          <div className="flex flex-col lg:flex-row justify-around">
            {/* left content section */}
            <div className="w-[90%] lg:w-[30%] h-fit mx-auto lg:ml-10 p-4 lg:p-6 flex flex-col gap-5 bg-richblack-800 rounded-lg">
              {FOOTER_INFO_DATA.map((element, index) => {
                return (
                  <div key={index} className="flex flex-row gap-2">
                    <div className="text-richblack-25">
                      {/* icon */}
                      {React.createElement(element.icon, { size: 24 })}
                    </div>
                    <div className="flex flex-col text-left gap-1">
                      <h1 className="text-xl font-bold text-richblack-25">
                        {element.title}
                      </h1>
                      <p className="text-richblack-400 text-sm font-semibold">
                        {element.header}
                      </p>
                      <p className="text-richblack-400 text-sm font-semibold">
                        {element.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* right form section */}
            <div className="w-[90%] lg:w-[50%] mx-auto mt-5">
              <ContactFormSection
                title={"Got a Idea? We've got the skills, Let's team up"}
                paragraph={
                  "Tell us more about yourself and what you've got in mind."
                }
              />
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-richblack-5">
              Reviews from other learners
            </h1>
            <ReviewSlider />
          </div>
        </section>
      </div>

      {/* footer section */}
      <section className="w-full">
        <Footer />
      </section>
    </div>
  );
};

export default ContactUs;
