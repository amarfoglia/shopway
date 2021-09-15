interface Order {
  id?: string;
  customerId: string;
  articleDetailsId: string;
  storeId: string;
  size: string;
  bookDate: Date;
  orderExpireAt: Date;
}
export default Order;
