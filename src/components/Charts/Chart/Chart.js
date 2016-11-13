import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';
import $ from 'jquery';

/* eslint-disable */

import styles from './Chart.less';

@PureRender
class Chart extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  componentDidMount() {
    const data = [
      [0, 4],
      [1, 6],
      [2, 3],
      [3, 8],
    ];
    const options = {
      series: {
        bars: {
          show: true,
          barWidth: 0.3,
          align: 'center',
          lineWidth: 0,
          fill: 0.75,
        },
      },
      xaxis: {
        ticks: [
          [0, 'First'],
          [1, 'Second'],
          [2, 'Third'],
          [3, 'Fourth'],
        ],
        mode: 'categories',
        tickLength: 0,
      },
      yaxis: {
        max: 10,
      },
    };

    $.plot(this.chartNode, [data], options);
  }

  setChartRef = (node) => {
    this.chartNode = node;
  }

  render() {
    return (
      <div
        className={styles.chart}
        ref={this.setChartRef}
      />
    );
  }
}

export default Chart;
