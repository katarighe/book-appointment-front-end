import { useState } from 'react';
import * as API from '../api/apis';
import { useDispatch } from 'react-redux';
import { toggleShow } from '../Redux/Features/globalSlice';

export const useGlobalHooks = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ error: false, errMessage: '' });

  const openModal = (id) => {
    setOpen((prev) => ({
      ...prev,
      [id]: true,
    }));

    // console.log(`Opened modal with ID: ${id}`);
  };

  const dispatch = useDispatch();

  const handleShow = (id) => {
    dispatch(toggleShow(id));
  };

  const btnTaps = () => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  const getColor = (rating, index) => {
    if (rating >= index + 1) {
      // Color for rated stars
      return 'rated';
    }
    // Color for unrated stars
    return 'noRating';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();

    const datePart = `${day}/${month}/${year}`;

    return datePart;
  };

  const formatTime = (TimeString) => {
    const Time = new Date(TimeString);
    const hours = Time.getHours();
    const minutes = Time.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    const timePart = `${formattedHours}:${minutes} ${amOrPm}`;

    return timePart;
  };

  const getJobCreationDate = (date) => {
    // conver date string to proper date object by using: new Date()
    const jobDate = new Date(date);
    //  get current date
    const currentDate = new Date();
    // get the difference between the twodates
    const dateDifference = currentDate - jobDate;

    // Calculate the time difference in seconds, minutes, hours, and days
    const secondsDifference = Math.floor(dateDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    let message = '';

    if (daysDifference > 0) {
      message = `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    } else if (hoursDifference > 0) {
      message = `${hoursDifference} hour${
        hoursDifference !== 1 ? 's' : ''
      } ago`;
    } else if (minutesDifference > 0) {
      message = `${minutesDifference} minute${
        minutesDifference !== 1 ? 's' : ''
      } ago`;
    } else {
      message = `${secondsDifference} second${
        secondsDifference !== 1 ? 's' : ''
      } ago`;
    }
    return message;
  };

  // Using set method, we'll check if item is duplicated and unique too
  const removeDuplicateItems = (getChats) => {
    console.log(getChats);
    // decalre ne set variable
    let set = new Set();

    // where to store duplicated items
    let duplicatedItems = [];

    // where to store unique items
    let uniqueItems = [];

    // Loop through the array to check for duplicated items
    for (let i = 0; i < getChats.length; i++) {
      if (
        set.has({
          id: getChats[i]._id,
          name: getChats[i].name,
          image: getChats[i].profileImage,
        })
      ) {
        // get duplicates items
        duplicatedItems.push(getChats[i]);
      } else {
        // get unique items
        uniqueItems.push({
          id: getChats[i]._id,
          name: getChats[i].name,
          image: getChats[i].profileImage,
        });
      }

      set.add({
        id: getChats[i]._id,
        name: getChats[i].name,
        image: getChats[i].profileImage,
      });
    }
    // console.log(duplicatedItems);
    console.log(uniqueItems);

    // convert it back to array
    return {
      duplicatedItems: Array.from(new Set(duplicatedItems)),
      uniqueItems,
    };
  };

  // Search function
  const handleSearch = (data, searchQuery, setData, key) => {
    if (data && data.length > 0) {
      const filtered =
        searchQuery !== ''
          ? data.filter((item) =>
              item[key].toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : data;
      setData(filtered);
    }
  };

  const handleCandidateSearch = (data, searchQuery, setData, key) => {
    if (data && data.length > 0) {
      const filtered =
        searchQuery !== ''
          ? data.filter((item) =>
              item.employee[key]
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
            )
          : data;
      setData(filtered);
    }
  };

  const uploadFilesToServer = async (file) => {
    // get the upload file
    if (file) {
      // apend the uploaded file
      const formData = new FormData();
      formData.append('files[]', file);

      // eslint-disable-next-line no-useless-catch
      try {
        // Add it to the endpoint body
        const resp = await API.uploadFiles(formData);

        // return the response and used as wished
        return resp;
      } catch (error) {
        throw error;
      }
    }
  };

  return {
    handleShow,
    show,
    setShow,
    btnTaps,
    getColor,
    loading,
    setLoading,
    errors,
    setErrors,
    formatDate,
    formatTime,
    openModal,
    open,
    setOpen,
    getJobCreationDate,
    removeDuplicateItems,
    handleSearch,
    handleCandidateSearch,
    uploadFilesToServer,
  };
};
