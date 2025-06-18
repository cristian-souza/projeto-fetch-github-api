import { baseUrl, eventsQuantity } from '../variables.js'

async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`)
    const events = await response.json()

    const filteredEvents = events
        .filter(event => event.type === "PushEvent" || event.type === "CreateEvent")

    return filteredEvents
}

export { getEvents }