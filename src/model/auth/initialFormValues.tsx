import Role from '../users/role';

const { CUSTOMER } = Role;

const initialValues = {
  user: {
    email: '',
    password: '',
    fullName: '',
    passwordConfirm: '',
    role: CUSTOMER,
    photo: '',
  },
  store: {
    logo: '',
    phone: '',
    name: '',
    address: '',
    city: '',
  },
};

export default initialValues;
