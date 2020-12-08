import {Suspense} from "react";
import {useQuery} from "react-query";

export default function Avatar ({src, alt, fallbackSrc, ...props}) {
  return (
    <div className="user-avatar">
      <Suspense fallback={<img src={fallbackSrc} alt="Fallback Avatar"/>}>
        <Img src={src} alt={alt} {...props}/>
      </Suspense>
    </div>
  );
}

function Img ({src, alt, ...props}) {
  const {data: imgObject} = useQuery(
    src,
    () => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    }),
    {suspense: true}
  );

  return <img src={imgObject.src} alt={alt} {...props}/>
}