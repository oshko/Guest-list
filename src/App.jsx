import { useState, useEffect } from "react";
import { getGuests, getGuest } from "./guests";

export default function App() {
  const [detail, setDetail] = useState(false);
  const [guestID, setGuestID] = useState(null);
  if (!detail) {
    return <GuestList setdetail={setDetail} setGuestID={setGuestID} />;
  }

  return <GuestDetail setDetail={setDetail} guestID={guestID} />;
}

function GuestList({ setGuestID, setdetail }) {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const syncGuests = async () => {
      const data = await getGuests();
      console.log(data);
      setGuests(data);
    };
    syncGuests();
  }, []);

  function handleGuestDetail(id) {
    setGuestID(id);
    setdetail(true);
  }

  return (
    <section className="guest-list">
      <h1>Guest List</h1>
      <ul>
        {guests.map((guest) => (
          <li key={guest.id} onClick={() => handleGuestDetail(guest.id)}>
            Name: {guest.name}, phone: {guest.phone}
          </li>
        ))}
      </ul>
      <p>Select a guest to see more details</p>
    </section>
  );
}

function GuestDetail({ guestID, setDetail }) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const syncGuest = async () => {
      const data = await getGuest(guestID);
      console.log(data);
      setGuest(data);
    };
    syncGuest();
  }, [guestID]);

  if (!guest) {
    return <p>Loading guest details...</p>;
  }

  return (
    <section className="guest-detail">
      <h3>Name: {guest.name}</h3>
      <h3>Email: {guest.mail}</h3>
      <h3>Phone #: {guest.phone}</h3>
      <h3>Job: {guest.job} </h3>
      <h3>Guest bio: {guest.bio}</h3>
      <button onClick={() => setDetail(false)}>back</button>
    </section>
  );
}
