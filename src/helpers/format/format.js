import StorageManager from './StorageManager';

export const dateDiff = (date) => {
  const currentDate = new Date();
  const inputDate = new Date(date);
  const diffTime = Math.abs(inputDate - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const blobToImage = () => {

};

export const userStatus = () => {
  const auth = StorageManager.getToken();
  if (auth.token === '' || !auth || (auth.token !== '' && dateDiff(auth.exp_date.toString()) > 1)) {
    return false;
  }
  return true;
};
