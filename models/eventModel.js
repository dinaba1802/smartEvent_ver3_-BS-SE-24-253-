import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    event_name: String,
    event_type: String,
    eventKind: {
      type: String,
      enum: ['wedding', 'birthday', 'meeting-event'],
      default: 'wedding',
    },
    eventLocation: {
      type: String,
      default: 'my city..',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Event', EventSchema);