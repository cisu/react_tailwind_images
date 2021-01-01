import React, {useState, useEffect} from 'react';
import ImagesCard from './components/imagesCard';
import ImagesSearch from './components/imagesSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);

  return (
    <div className='container mx-auto'>
      <ImagesSearch searchText={text => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <div className='animate-pulse'>
          <p className='text-2xl text-green-700 text-center mx-auto mt-3'>
            Κουζουλάθηκες ωρέ;;;
          </p>
          <p className='text-2xl text-green-500 text-center mx-auto mt-3'>
            Δεν κατέ'ω ίντα πράμα ζητάς...
          </p>
        </div>
      )}

      {isLoading ? (
        <h1 className='text-6xl text-center mx-auto mt-32'>Loading...</h1>
      ) : (
        <div className='grid grid-cols-3 gap-4'>
          {images.map(image => (
            <ImagesCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
