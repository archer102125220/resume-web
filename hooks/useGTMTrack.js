import { useEffect } from 'react';

export function useGTMTrack(trackData) {
  useEffect(() => {
    try {
      const title = document.getElementsByTagName('title')[0].innerText;
      console.log({ title });
      window.dataLayer.push({ ...trackData, title });
    } catch (error) {
      console.log(error);
    }
  }, []);
}

export default useGTMTrack;
