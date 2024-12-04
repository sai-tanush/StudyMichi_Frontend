import HighlightText from '../core/Homepage/HighlightText';
import aboutUsImage1 from '../../assets/Images/aboutus1.webp';
import aboutUsImage2 from '../../assets/Images/aboutus2.webp';
import aboutUsImage3 from '../../assets/Images/aboutus3.webp';
import Quote from '../core/AboutUs/Quote';

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

      {/* section 1 */}
      <section className="mt-[5rem]">
        <div>
          <Quote />
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
