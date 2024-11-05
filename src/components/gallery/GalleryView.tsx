type GalleryViewProps = {
  gallery: {
    images: string[];
    grid: number;
    ratio: string;
  };
};
const GalleryView = ({ gallery }: GalleryViewProps) => {
  console.log(gallery);
  return <div>GalleryView</div>;
};

export default GalleryView;
