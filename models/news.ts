import mongoose from "mongoose"

const translationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false })

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: [
        'Employee News',
        'Event Announcements',
        'Guidance Announcements',
        'HR Announcements',
        'Information Technology',
        'Human Resources',
        'Josoor',
        'Circulars'
      ]
    },
    translations: {
      ar: {
        type: translationSchema,
        required: false
      }
    }
  },
  {
    timestamps: true,
  }
)

export const News = mongoose.models.News || mongoose.model("News", newsSchema) 