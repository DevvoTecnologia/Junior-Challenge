import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
        <h2 className='text-3xl font-semibold text-gray-700 mb-6'>
          Page Not Found
        </h2>
        <p className='text-xl text-gray-600 mb-8'>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to='/'
          className='px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
