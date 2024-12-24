import { useParams } from 'react-router-dom';
import Footer from '../common/Footer';
import CourseSlider from '../core/Catalog/CourseSlider';
import { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apisconnector';
import { categories } from '../../services/apis';
import { getCatalogPageData } from '../../services/operations/pageAndComponentData';
import CourseCardFrequent from '../core/Catalog/CourseCardFrequent';
import { CourseProps } from '../../utils/slices/courseSlice';

const Catalog: React.FC = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState<string>('');

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const result = await apiConnector({
        method: 'GET',
        url: categories.CATEGORIES_API,
      });
      console.log('result in useEffect in getCategories = ', result);

      const category_id = result?.data?.allCategories?.filter(
        (ct: any) => ct.name.split(' ').join('-').toLowerCase() === catalogName,
      )[0]._id;
      setCategoryId(category_id);
      console.log('categoryId in getCategories = ', category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const result = await getCatalogPageData(categoryId);
        setCatalogPageData(result);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryDetails();
  }, [categoryId]);

  console.log('CatalogPageData = ', catalogPageData);

  return (
    <div className="text-richblack-5">
      <div>
        <p>
          {`Home / Catalog / `}
          <span>{catalogPageData?.data?.selectedCategory?.name}</span>
        </p>
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* section 1 */}
        <div>
          <p>Courses to get you started</p>
          <div className="flex gap-x-3">
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <div>
            <CourseSlider
              courses={catalogPageData?.data?.selectedCategory?.courses}
            />
          </div>
        </div>

        {/* section 2 */}
        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
          <div>
            <CourseSlider
              courses={catalogPageData?.data?.differentCategory?.courses}
            />
          </div>
        </div>

        {/* section 3 */}
        <div>
          <p>Frequently Bought </p>
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
