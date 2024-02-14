import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoAlbums = () => {
  const [albums, setAlbums] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        const photos = response.data;

        // Group photos into albums using albuId
        const albmMap = new Map();
        photos.forEach((photo) => {
          const id = photo.albumId;
          if (!albmMap.has(id)) {
            albmMap.set(id, { cover: photo, photos: [photo] });
          } else {
            albmMap.get(id).photos.push(photo);
          }
        });

        //  the values fromthe map to get the albums aray
        const albumArray = Array.from(albmMap.values());
        setAlbums(albumArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Photo's Albums</h1>
      {albums.map((album) => (
        <div key={album.cover.id}>
          <div>
            {/* set Photos in the div */}
            {album.photos.map((photo) => (
              <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
            ))}
          </div>
          <p>Total photos: {album.photos.length}</p>
        
        </div>
      ))}

   
    </div>
  );
};

export default PhotoAlbums;
