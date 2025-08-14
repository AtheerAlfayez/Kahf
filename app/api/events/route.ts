import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

export async function GET() {
  try {
    console.log('Fetching all events...');
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    console.log(`Found ${events.length} events`);
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log('Received POST request to /api/events');
    await connectDB();
    
    const body = await request.json();
    console.log('Received request body:', body);
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'date', 'location'];
    for (const field of requiredFields) {
      if (!body[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate date format
    const eventDate = new Date(body.date);
    if (isNaN(eventDate.getTime())) {
      console.log('Invalid date format:', body.date);
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    console.log('Creating event with data:', body);
    const event = await Event.create({
      ...body,
      date: eventDate
    });
    console.log('Event created successfully:', event);
    
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Failed to create event:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create event' },
      { status: 500 }
    );
  }
} 