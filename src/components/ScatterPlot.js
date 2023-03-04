import Plot from 'react-plotly.js';

const ScatterPlot = ({ data, handleHover, handleSelect }) => (
  <Plot
    data={[
      {
        type: 'scatter',
        mode: 'markers',
        x: data.map((d) => d.x),
        y: data.map((d) => d.y),
        customdata: data,
        marker: {
          color: data.map((d) => d.marker.color),
          size: data.map((d) => d.marker.size),
          line: {
            width: 0,
          },
        },
        hoverinfo: 'none',
      },
    ]}
    layout={{
      width: '100vw',
      height: '100vh',
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 4,
      },
      xaxis: {
        showgrid: false,
        zeroline: false,
        visible: false,
      },
      yaxis: {
        showgrid: false,
        zeroline: false,
        visible: false,
      },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      hovermode: 'closest',
      clickmode: 'event+select',
    }}
    config={{
      displayModeBar: false
    }}
    onHover={handleHover}
    onClick={handleSelect}
  />
);

export default ScatterPlot;