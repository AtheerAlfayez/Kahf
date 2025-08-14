import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { News } from "@/models/news"

// GET all news items
export async function GET() {
  try {
    await connectToDatabase()
    const news = await News.find().sort({ date: -1 })
    return NextResponse.json(news, { status: 200 })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      { error: "Failed to fetch news", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

// POST new news item
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { title, date, image, category, content } = body
    if (!title || !date || !image || !category || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await connectToDatabase()
    const news = await News.create(body)
    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json(
      { error: "Failed to create news", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

// PUT update news item
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { _id, ...updateData } = body

    if (!_id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await connectToDatabase()
    const news = await News.findByIdAndUpdate(_id, updateData, { new: true })
    
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    return NextResponse.json(news, { status: 200 })
  } catch (error) {
    console.error("Error updating news:", error)
    return NextResponse.json(
      { error: "Failed to update news", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

// DELETE news item
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    await connectToDatabase()
    const news = await News.findByIdAndDelete(id)
    
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "News deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json(
      { error: "Failed to delete news", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}

const defaultNews = [
  {
    _id: "1",
    title: "Foundation Launches New Initiative",
    date: "2024-01-15",
    image: "/news-default.jpg",
    category: "Employee News",
    content: "The foundation is launching a new initiative to help communities in need..."
  },
  {
    _id: "2",
    title: "Upcoming Charity Event",
    date: "2024-01-20",
    image: "/news-default.jpg",
    category: "Event Announcements",
    content: "Join us for our upcoming charity event where we'll be raising funds for..."
  },
  {
    _id: "3",
    title: "New Guidelines Released",
    date: "2024-01-25",
    image: "/news-default.jpg",
    category: "Guidance",
    content: "We've updated our guidelines to better serve our communities..."
  }
]

export async function GETSampleNews() {
  return NextResponse.json(sampleNews)
} 