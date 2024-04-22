import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



const Chart = ({ data }) => {
    
    const data01 = [
        { name: 'Needs', value: data[0].total_needs },
        { name: 'Wants', value: data[0].total_wants },
        { name: 'Savings', value: data[0].total_savings },
      
      ];
      const data02 = [
        { name: 'Needs spent', value: data[0].needs_spent },
        { name: 'Wants spent', value: data[0].wants_spent },
        { name: 'Unspent', value: data[0].monthly_income - (data[0].needs_spent + data[0].wants_spent) },
        
      ];

      const COLORS = ['#ED8E90', '#31f5e4', '#15cc0e'];

      const RADIAN = Math.PI / 180;
      const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const x = cx + (outerRadius - innerRadius) / 5 * Math.cos(-midAngle * RADIAN);
        const y = cy + (outerRadius - innerRadius) / 2 * Math.sin(-midAngle * RADIAN);
      
        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={20}>
            {data01[index].name}:   
            ${(data01[index].value).toFixed(0)}
          </text>
          
        );
      };
      

      return (
        <div className='text-white rounded-3xl box-border p-4 border-4 whitespace-nowrap overflow-hidden cursor-pointer' style={{ width: '52rem', transform: 'translateX(3%)'}}>
          <div className = 'text-5xl'>Budget Plan: {data[0].budget_split} Split</div><br/>
          <div className = 'text-2xl'>Monthly Income: ${data[0].monthly_income}</div>
        <PieChart width={1300} height={800}>
          
          <Pie
            data={data01}
            dataKey="value"
            cx="29%"
            cy="50%"
            outerRadius={225}
            fill="#82ca9d"
            label={renderInnerLabel}
            
          >
            {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          <Pie
            data={data02}
            dataKey="value"
            cx="29%"
            cy="50%"
            innerRadius={225}
            outerRadius={250}
            fill="#82ca9d"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data02.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                
              ))}
            </Pie>
        </PieChart>
      </div>
      );
}

    
  

export default Chart;

