import React from 'react';
import { FaEarthAsia } from 'react-icons/fa6';
import { IoIosChatboxes } from 'react-icons/io';
import { MdCall } from 'react-icons/md';
import ContactUsForm from '../common/ContactUsForm';
import ContactFormSection from '../core/AboutUs/ContactFormSection';

const ContactUs: React.FC = () => {
  const INFO_DATA = [
    {
      icon: IoIosChatboxes,
      title: 'Chat on us',
      header: 'Our friendly team is here to help,',
      content: 'studymichi@gmail.com',
    },
    {
      icon: FaEarthAsia,
      title: 'Visit us',
      header: 'Come and say hello to our office HQ.',
      content:
        'Here is the location // Karasuno High School, Miyagi Prefecture, Japan',
    },
    {
      icon: MdCall,
      title: 'Call us',
      header: 'Mon - Fri From 8am to 6pm',
      content: '+81 12345 56789',
    },
  ];
  return (
    <div className="mt-[100px] w-11/12 max-w-maxContent text-center flex flex-col ml-[15%] mb-[2%]">
      {/* section 1 */}
      <section>
        <div className="flex justify-around">
          {/* left content section */}
          <div className="w-[30%] h-fit ml-10 p-6 flex flex-col gap-5 bg-richblack-800 rounded-lg">
            {INFO_DATA.map((element, index) => {
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
          <div className=" w-[50%]">
            <ContactFormSection
              title={"Got a Idea? We've got the skills, Let's team up"}
              paragraph={
                "Tell us more about yourself and what you've got in mind."
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
