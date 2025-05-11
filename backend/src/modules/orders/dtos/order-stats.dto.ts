export class OrderStatsDto {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: {
    [status: string]: number;
  };
  revenueByDay: {
    date: string;
    revenue: number;
  }[];
}
