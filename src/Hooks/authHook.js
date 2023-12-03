import useSWR from 'swr';
import * as API from '../pages/api/apis';

export const useAuthHook = () => {
  // Get current user
  const { data: userData, error: userError } = useSWR(
    'getCurrentUser',
    API.getCurrentBuyer,
    {
      revalidateOnFocus: false,
    },
  );

  const { data: merchantData, error: merchantError } = useSWR(
    'getCurrentMerchant',
    API.getCurrentMerchant,
    {
      revalidateOnFocus: false,
    },
  );

  // Get categories
  const { data: categoryData, error: categoryError } = useSWR(
    'getCategories',
    API.getCategories,
    {
      revalidateOnFocus: false,
    },
  );

  // Save userToken to localStorage on signedin
  // const saveUserToken = (user, token) => {
  //   if (user === 'Buyer') {
  //     localStorage.setItem('userToken', token);
  //   } else {
  //     localStorage.setItem('merchantToken', token);
  //   }
  // };

  return {
    userData,
    userError,
    categoryData,
    categoryError,
    merchantData,
    merchantError,
  };
};
