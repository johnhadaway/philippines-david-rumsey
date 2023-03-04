import React, { useEffect, useState } from 'react';
import './App.css';
import CommentFormOverlay from './components/CommentFormOverlay';
import ImageOverlay from './components/ImageOverlay';
import ScatterPlot from './components/ScatterPlot';
import dataset from './dataset.json';

const App = () => {
  const [hoverData, setHoverData] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [comment, setComment] = useState('');

  const data = dataset.map((d, i) => ({
    x: d.embedding[0],
    y: d.embedding[1],
    z: i,
    imagePath: d.image_path,
    marker: {
      color: '#0038A7',
      size: 5,
    },
  }));

  if (hoverData) {
    const { z } = hoverData;
    data[z].marker.color = 'red';
  }

  useEffect(() => {
    if (hoverData) {
      import(`./images/${hoverData.imagePath}`).then((img) => {
        setHoveredImage(img.default);
      });
    } else {
      setHoveredImage(null);
    }
  }, [hoverData]);

  const handleHover = (event) => {
    if (event.points.length) {
      const { x, y, customdata } = event.points[0];
      const { imagePath } = customdata;
      setHoverData({ x, y, z: customdata.z, imagePath });
    } else {
      setHoverData(null);
    }
  };

  const handleSelect = (event) => {
    if (event.points.length) {
      const { z } = event.points[0].customdata;
      setSelectedData(z);
    } else {
      setSelectedData(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComment('');
    setSelectedData(null);
  };

  return (
    <div className="graph-container">
      <ImageOverlay hoverData={hoverData} hoveredImage={hoveredImage} />
      <CommentFormOverlay
        selectedData={selectedData}
        comment={comment}
        setComment={setComment}
        handleSubmit={handleSubmit}
      />
      <ScatterPlot data={data} handleHover={handleHover} handleSelect={handleSelect} />
    </div>
  );
};

export default App;