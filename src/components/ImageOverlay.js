const ImageOverlay = ({ hoverData, hoveredImage }) => (
  hoverData && hoveredImage && (
    <div className="image-overlay">
      <img src={hoveredImage} alt={hoverData.imagePath} />
    </div>
  )
);

export default ImageOverlay;