import React, { useEffect, useState, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, Title }  from 'chart.js';
import 'chartjs-adapter-moment';
import { chartConfig } from '../../config/chartConfig';
import { StyledExample } from './style';
Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Title);

export type ExampleProps = {
  data: any,
  title: string,
}

const CoinChart = (props: ExampleProps) => {
  const { data, title } = props;
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState('7d');
  const canvasCtxRef = React.useRef<HTMLCanvasElement | null>(null);

  const handleTimeChange = () => {
    console.log(data);
    switch(timeFormat) {
      case '24h':
        return day;
      case '7d':
        return week;
      case '1y':
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (canvasCtxRef && canvasCtxRef.current && detail) {
      const chart = new Chart(canvasCtxRef.current, {
        type: 'line',
        data: {
          datasets: [
            {
              data: handleTimeChange(),
              backgroundColor: "rgba(255, 123, 0, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.8)",
              borderWidth: 3,
              pointRadius: 2,
              parsing: {
                xAxisKey: 't',
                yAxisKey: 'y',
              },
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: {
            duration: 2200,
          },
          // animations: {
          //   tension: {
          //     duration: 1000,
          //     easing: 'linear',
          //     from: 10,
          //     to: 0,
          //     loop: true
          //   },
          // },
          interaction: {
            mode: 'y'
          },
          plugins: {
            title: {
              display: true,
              color: '#fff',
              text: `${title.toLocaleUpperCase()} PRICE (LAST ${timeFormat.toLocaleUpperCase()})`,
            },
          },
          elements: {
            point: {
              radius: 2,
              backgroundColor: 'rgba(255, 123, 0, 0.9)',
              hitRadius: 5,
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'hour',
              }
            },
            y: {
              type: 'linear',
              alignToPixels: true,
            }
          }
        }
      });
    }
  }, []);

  return (
    <StyledExample>
      <div>
        <canvas ref={canvasCtxRef} id="myChart" width="800px" height="500px"></canvas>
      </div>
    </StyledExample>
  );
}

export default CoinChart;