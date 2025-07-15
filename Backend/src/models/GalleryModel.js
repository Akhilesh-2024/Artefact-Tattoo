import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    validate: {
      validator: function(v) {
        // Only validate if type is video
        if (this.type !== 'video') return true;
        // YouTube URL validation
        return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v);
      },
      message: props => `${props.value} is not a valid YouTube URL!`
    }
  },
  title: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageOrder: {
    type: Number,
    default: 0
  },
  videoOrder: {
    type: Number,
    default: 0
  }
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;