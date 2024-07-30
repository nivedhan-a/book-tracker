import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios.get(`https://book-tracker-backend-beta.vercel.app/books/${id}`)
      .then((response) => {
        setBook(response.data); // Adjust if necessary based on the API response structure
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.response?.data?.message || 'Failed to load book details';
        enqueueSnackbar(errorMessage, { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]); // Include `id` and `enqueueSnackbar` in the dependency array

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{book.createdAt ? new Date(book.createdAt).toString() : 'N/A'}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{book.updatedAt ? new Date(book.updatedAt).toString() : 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
