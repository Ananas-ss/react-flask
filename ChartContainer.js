import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import axios from 'axios';

const ChartContainer = ({ chartType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = '';
        if (chartType === 'sales') {
          url = 'http://localhost:5001/api/sales-data';
        } else if (chartType === 'users') {
          url = 'http://localhost:5001/api/user-data';
        }
        
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [chartType]);

  const getChartOption = () => {
    if (chartType === 'sales') {
      return {
        title: {
          text: '产品销售数据'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: data.map(item => item.product)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data.map(item => item.sales),
          type: 'bar'
        }]
      };
    } else if (chartType === 'users') {
      return {
        title: {
          text: '用户增长数据'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['用户数']
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.month)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '用户数',
          data: data.map(item => item.users),
          type: 'line',
          smooth: true
        }]
      };
    }
    return {};
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <ReactECharts
      option={getChartOption()}
      style={{ height: '500px', width: '100%' }}
    />
  );
};

export default ChartContainer;