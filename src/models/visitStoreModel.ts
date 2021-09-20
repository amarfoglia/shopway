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
export { StoreVisitDoc, Visit, StoreVisit };

export default mongoose.model<StoreVisitDoc>('StoreVisit', storeVisitSchema);
