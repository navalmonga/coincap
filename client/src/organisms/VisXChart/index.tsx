import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { curveMonotoneX } from '@visx/curve';
import { localPoint } from '@visx/event';
import { AreaClosed, Line, Bar } from '@visx/shape';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { ChartContainer, StyledSelect } from './style';

export type CoinData = {
  t: any;
  y: any;
}

export type ChartData = {
  day: any;
  week?: any;
  year?: any;
  detail?: any;
}

export type ChartProps = {
  data: ChartData,
  width: number,
  height: number,
  showTooltip?: any,
  hideTooltip?: any,
  tooltipData?: any,
  tooltipLeft?: number,
  tooltipTop?: number,
}

export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid white',
  color: 'white',
};

// util
const formatDate = timeFormat("%I:%S %p %b %d, '%y");
const margin = { top: 0, right: 0, bottom: 0, left: 0 };
// accessors
const getDate = (d: CoinData) => new Date(d.t);
const getStockValue = (d: CoinData) => d.y;
const bisectDate = bisector<CoinData, Date>((d: any) => new Date(d.t)).left;

export const suppTimeFormats = [
  {id: '24h', name: '24H'},
  {id: '7d', name: '7 DAYS'},
  {id: '1y', name: '1 YEAR'},
];

const VisXChart = (props: ChartProps) => {
  const { 
    data,
    width,
    height,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = props;
  // const { day, week, year, detail } = data;
  console.log(data === null);
  const [timeFormat, setTimeFormat] = useState('24h');
  const [priceData, setPriceData] = useState([]);

  const handleTimeChange = () => {
    console.log(data.day);
    switch(timeFormat) {
      case '24h':
        return data.day;
      case '7d':
        return data.week;
      case '1y':
        return data.year;
      default:
        return data.day;
    }
  };

  useEffect(() => {
    setPriceData(handleTimeChange())
  }, []);
  // bounds
  const innerWidth = width - margin.left - margin.right; // parseInt(width.replace('px', '')) - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom; // parseInt(height.replace('px', '')) - margin.top - margin.bottom;
  // const priceData = handleTimeChange(timeFormat);
  console.log(priceData);
  // scales
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(priceData, getDate) as [Date, Date],
      }),
    [innerWidth, margin.left],
  );
  const stockValueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: extent(priceData, getStockValue) as [any, any],
        nice: true,
      }),
    [margin.top, innerHeight],
  );

  // tooltip handler
  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = dateScale.invert(x);
      const index = bisectDate(priceData, x0, 1);
      const d0 = priceData[index - 1];
      const d1 = priceData[index];
      let d = d0;
      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: stockValueScale(getStockValue(d)),
      });
    },
    [showTooltip, stockValueScale, dateScale],
  );

  return (
    <ChartContainer>
      {/* <h3>
        <StyledSelect name="time" id="time" onChange={(e: any) => setTimeFormat(e.target.value)}>
          {suppTimeFormats.map(t => {
            return <option key={t.id} value={t.id}>{t.name.toUpperCase()}</option>
          })} 
        </StyledSelect>
      </h3> */}
      {/* <h3>{`(LAST ${timeFormat.toLocaleUpperCase()})`}</h3> */}
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={'100%'}
          height={height}
          fill="url(#area-background-gradient)"
          rx={2}
        />
        <LinearGradient id="area-background-gradient" from={background} to={background2} />
        <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
        <GridRows
            left={margin.left}
            scale={stockValueScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          <GridColumns
            top={margin.top}
            scale={dateScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.9}
            pointerEvents="none"
          />
          <AreaClosed<CoinData>
            data={priceData}
            x={d => dateScale(getDate(d)) ?? 0}
            y={d => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop? tooltipTop + 1: 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
      </svg>
      {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop? tooltipTop - 12: 12}
            left={tooltipLeft? tooltipLeft + 12: 12}
            style={tooltipStyles}
          >
            {`$${getStockValue(tooltipData)}`}
          </TooltipWithBounds>
          <Tooltip
            top={innerHeight + margin.top + 14}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
              width: 200,
              textAlign: 'center',
              transform: 'translateX(-0%)',
            }}
          >
            {formatDate(getDate(tooltipData))}
          </Tooltip>
        </div>
      )}
    </ChartContainer>
  );
}

export default withTooltip(VisXChart);