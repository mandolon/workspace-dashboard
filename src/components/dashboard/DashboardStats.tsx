
import React from 'react';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardStats = () => {
  const stats = [
    {
      title: "November Revenue",
      value: "$2,131.86",
      change: "+20% from last month",
      icon: DollarSign,
      positive: true
    },
    {
      title: "Subscriptions",
      value: "$7,411.30",
      change: "+10% from last month",
      icon: Users,
      positive: true
    },
    {
      title: "Sales",
      value: "$9,896.66",
      change: "+19% from last month",
      icon: ShoppingCart,
      positive: true
    },
    {
      title: "Active Now",
      value: "$7,940.85",
      change: "+201 since last hour",
      icon: TrendingUp,
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
