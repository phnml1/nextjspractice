import Image from 'next/image'
import EventList from '@/components/event/event-list'
import { getFeaturedEvents } from '@/dummy-data'
export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  )
}