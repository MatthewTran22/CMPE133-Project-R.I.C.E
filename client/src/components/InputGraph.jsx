import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';



const Chart = ({ split, income }) => {
    
    const data01 = [
        { name: 'Needs', value: 1 },
        { name: 'Wants', value: 1 },
        { name: 'Savings', value: 1 },
      
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
        <ResponsiveContainer width = "100%" height="100%">
            <div style={{ width: '55rem', transform: 'translateX(3%)'}}>
                <PieChart>
                
                    <Pie
                        data={data01}
                        dataKey="value"
                        cx="31%"
                        cy="50%"
                        outerRadius={225}
                        fill="#82ca9d"
                        label={renderInnerLabel}
                        
                    >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                </PieChart>
            </div>
        </ResponsiveContainer>
       
      );
}

    
  

export default Chart;

