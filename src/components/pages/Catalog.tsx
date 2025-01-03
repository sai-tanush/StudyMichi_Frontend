import { useParams } from 'react-router-dom';
import Footer from '../common/Footer';
import CourseSlider from '../core/Catalog/CourseSlider';
import { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apisconnector';
import { categories } from '../../services/apis';
import { getCatalogPageData } from '../../services/operations/pageAndComponentData';
import CourseCardFrequent from '../core/Catalog/CourseCardFrequent';
import { CourseProps } from '../../utils/slices/courseSlice';
import Spinner from '../common/Spinner';
import toast from 'react-hot-toast';

interface Categories {
  description: string;
  name: string;
  _id: string;
}

interface Category_Props {
  courses: CourseProps[];
  description: string;
  name: string;
  _v: number;
  _id: string;
}

interface CatalogPageData {
  success: boolean;
  message: string;
  data: {
    selectedCategory: Category_Props;
    differentCategory: Category_Props;
    mostSellingCourses: CourseProps[];
  };
}

const Catalog: React.FC = () => {
  const { catalogName } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [popular, setPopular] = useState<boolean>(true);
  const [catalogPageData, setCatalogPageData] =
    useState<CatalogPageData | null>(null);
  const [categoryId, setCategoryId] = useState<string>('');

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const result = await apiConnector({
        method: 'GET',
        url: categories.CATEGORIES_API,
      });

      const category_id = result?.data?.allCategories?.filter(
        (ct: Categories) =>
          ct.name.split(' ').join('-').toLowerCase() === catalogName,
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        setLoading(true);
        const result = await getCatalogPageData(categoryId);
        setCatalogPageData(result);
      } catch (error) {
        toast.error('Could not fetch Categories');
      }
      setLoading(false);
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className=" bg-richblack-700 py-5">
        <div className="w-4/5 mx-auto lg: min-h-[200px] flex flex-col justify-center">
          <p className="text-sm text-richblack-300 leading-8">
            {`Home  /  Catalog /`}
            <span className="text-yellow-50 mx-3">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-4xl text-richblack-5 mt-3">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="text-sm text-richblack-100 mt-2">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      <div className="w-4/5 mx-auto">
        {/* section 1 */}
        <div className="mt-10">
          <p className="text-richblack-5 text-3xl font-semibold">
            Courses to get you started
          </p>
          <div className="flex gap-x-3 text-richblack-5 my-5 mx-2">
            <p
              className={`relative cursor-pointer ${
                popular
                  ? 'text-yellow-50 after:content-[""] after:block after:h-[2px] after:bg-yellow-500 after:w-full after:mt-1'
                  : ''
              }`}
              onClick={() => setPopular(true)}
            >
              Most Popular
            </p>
            <p
              className={`relative cursor-pointer ${
                !popular
                  ? 'text-yellow-50 after:content-[""] after:block after:h-[2px] after:bg-yellow-500 after:w-full after:mt-1'
                  : ''
              }`}
              onClick={() => setPopular(false)}
            >
              New
            </p>
          </div>
          <div>
            {catalogPageData && (
              <CourseSlider
                courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            )}
          </div>
        </div>

        {/* section 2 */}
        <div className="my-10">
          <p className="text-richblack-5 text-3xl font-semibold">
            Top Courses in {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <div>
            {catalogPageData && (
              <CourseSlider
                courses={catalogPageData?.data?.differentCategory?.courses}
              />
            )}
          </div>
        </div>

        {/* section 3 */}
        <div className="my-10">
          <p className="text-richblack-5 text-3xl font-semibold">
            Frequently Bought{' '}
          </p>
          <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {catalogPageData &&
                catalogPageData?.data?.mostSellingCourses?.map(
                  (course: CourseProps, index: number) => (
                    <CourseCardFrequent
                      course={course}
                      key={index}
                      height={'h-[400px]'}
                    />
                  ),
                )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
