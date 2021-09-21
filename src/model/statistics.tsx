interface ViewStats {
  _id: Date;
  numberOfViews: number;
}

interface ProfitStats {
  _id: Date;
  numberOfOrders: number;
  profit: number;
}

interface Stats {
  viewsStore: ViewStats[];
  salesStore: ProfitStats[];
}

export default Stats;
