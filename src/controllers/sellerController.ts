import HandlerFactory from './helpers/handlerFactory';
import SellerModel, { SellerDoc } from '../models/users/sellerModel';

const factory = new HandlerFactory<SellerDoc>('seller');

class SellerController {
  getSeller = factory.getOne(SellerModel);

  getAllSellers = factory.getAll(SellerModel, {});

  updateSeller = factory.updateOne(SellerModel);

  deleteSeller = factory.deleteOne(SellerModel);
}

export default SellerController;
