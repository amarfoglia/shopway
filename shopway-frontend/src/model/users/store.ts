interface Store {
  _id: string;
  name: string;
  city: string;
  address: string;
  logo?: string | File;
  phone: string;
}

export default Store;
