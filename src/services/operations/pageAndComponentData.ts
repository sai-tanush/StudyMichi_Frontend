import toast from 'react-hot-toast';
import { apiConnector } from '../apisconnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async (categoryId: string) => {
  const toastId = toast.loading('Loading...');
  let result = [];

  try {
    const response = await apiConnector({
      method: 'POST',
      url: catalogData.CATALOGPAGEDATA_API,
      bodyData: {
        categoryId: categoryId,
      },
    });

    if (!response?.data?.success) {
      throw new Error('Could not fetch Category page data');
    }

    result = response?.data;
  } catch (error) {
    console.log('CATALOG PAGE DATA API ERROR...', error);
    toast.error(error.message);
    result = error.response;
  }
  toast.dismiss(toastId);
  return result;
};
