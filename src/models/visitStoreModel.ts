import mongoose from 'mongoose';

interface Visit {
  users: mongoose.Types.ObjectId[];
  dates: mongoose.Schema.Types.Date;
}

interface StoreVisit {
  storeId: mongoose.Types.ObjectId;
  visits: Visit[];
}

interface StoreVisitDoc extends Document, StoreVisit {}

const storeVisitSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Types.ObjectId,
    ref: 'Store',
    unique: true,
    required: true
  },
  visits: [{
    users: {
      type: [mongoose.Types.ObjectId],
      default: []
    },
    date: {
      type: mongoose.Schema.Types.Date
    }
  }]
});
/*
const storeVisitSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Types.ObjectId,
    ref: 'Store'
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  dates: {
    type: [String],
    default: () => new Date().toLocaleDateString()
  }
});
*/
export { StoreVisitDoc, Visit, StoreVisit };

export default mongoose.model<StoreVisitDoc>('StoreVisit', storeVisitSchema);
