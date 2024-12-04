import HighlightText from '../core/Homepage/HighlightText';
import aboutUsImage1 from '../../assets/Images/aboutus1.webp';
import aboutUsImage2 from '../../assets/Images/aboutus2.webp';
import aboutUsImage3 from '../../assets/Images/aboutus3.webp';
import foundingStoryImage from '../../assets/Images/FoundingStory.png';
import Quote from '../core/AboutUs/Quote';
import Stats from '../core/AboutUs/Stats';

const AboutUs: React.FC = () => {
  return (
    <div className="mt-[100px] text-center">
      {/* section 1 */}
      <section>
        <div className="flex flex-col justify-center items-center">
          <header>
            <h1 className="text-richblack-5 text-4xl font-bold">
              Driving Innovation in Online Education for a <br></br>
              <HighlightText text={'Brighter Future'} />
            </h1>
            <p className="mt-3 text-richblack-100 text-lg">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a <br></br>
              brighter future by offering cutting-edge courses, leveraging
              emerging technologies, and nurturing a <br></br>
              vibrant learning community.
            </p>
          </header>
          <div className="flex gap-x-5 mt-10">
            <img src={aboutUsImage1} alt="AboutUs Studying" />
            <img src={aboutUsImage2} alt="AboutUs Studying" />
            <img src={aboutUsImage3} alt="AboutUs Studying" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="mt-[5rem]">
        <div>
          <Quote />
        </div>
      </section>

      {/* section 3 */}
      <section className="w-11/12 mt-[10rem] mx-auto ">
        <div className="flex flex-col my-10 justify-between items-center ml-[5rem] mb-[100px]">
          <div className="flex justify-center items-center gap-x-36">
            <div className="w-1/3 flex flex-col">
              <h1 className="text-4xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-200">
                Our Founding Story
              </h1>
              <p className="text-richblack-100 text-left mt-10">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-richblack-100 text-left mt-10">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div>
              <img
                src={foundingStoryImage}
                alt="Founding Story Image"
                className="mr-20"
              />
            </div>
          </div>
          <div className="flex justify-center items-center gap-x-36 mt-32">
            <div className="w-1/3 flex flex-col">
              <h1 className="text-4xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#E65C00] to-[#ffa600]">
                Our Vision
              </h1>
              <p className="w-4/5 text-richblack-100 text-left mt-5">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience with adaptive
                technology in understanding needs of student.
              </p>
            </div>
            <div className="w-1/3 flex flex-col">
              <h1 className="text-4xl text-left font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#39b5c5] to-[#02e1ff]">
                Our Mission
              </h1>
              <p className="w-4/5 text-richblack-100 text-left mt-5">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <Stats />

      {/* section 5 */}
      <section></section>
    </div>
  );
};

export default AboutUs;
