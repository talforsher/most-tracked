import axios from "axios";

interface Flight {
  flight_id: string;
  flight: string;
  callsign: string;
  squawk: string;
  clicks: number;
  from_iata: string;
  from_city: string;
  to_iata: string;
  to_city: string;
  model: string;
  type: string;
}

function parseThousands(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export async function getStaticProps() {
  const response = await axios.get(
    "https://www.flightradar24.com/flights/most-tracked",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    }
  );
  return {
    props: {
      data: response.data.data,
    },
    revalidate: 300,
  };
}

export default function Home({ data }: { data: Flight[] }) {
  return (
    <div className="container">
      <h1>Most Tracked Flights</h1>
      <ul>
        {data.map((flight: Flight, index: number) => (
          <li key={flight.flight_id}>
            <a
              href={`https://www.flightradar24.com/${flight.callsign}/${flight.flight_id}`}
              rel="noreferrer"
            >
              {index + 1}. {flight.flight} ({flight.callsign}) -{" "}
              {flight.from_city || "Unknown"} to {flight.to_city || "Unknown"} (
              {parseThousands(flight.clicks)} are tracking this flight)
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
