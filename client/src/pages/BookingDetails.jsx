import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axios";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const res = await api.get(`/bookings/${id}`);
      setBooking(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Booking not found");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async () => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await api.delete(`/bookings/${id}`);
      alert("Booking cancelled successfully");
      fetchBooking();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  if (loading)
    return (
      <h2 className="text-center mt-10 text-xl">
        Loading...
      </h2>
    );

  if (!booking)
    return (
      <h2 className="text-center mt-10">
        Booking not found
      </h2>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-6">
        Booking Details
      </h1>

      <img
        src={booking.eventId?.image}
        alt={booking.eventId?.title}
        className="w-full h-72 object-cover rounded-lg mb-6"
      />

      <h2 className="text-2xl font-bold">
        {booking.eventId?.title}
      </h2>

      <p className="mt-3 text-gray-600">
        {booking.eventId?.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div>
          <b>Date</b>
          <p>
            {new Date(booking.eventId?.date).toLocaleDateString()}
          </p>
        </div>

        <div>
          <b>Time</b>
          <p>{booking.eventId?.time}</p>
        </div>

        <div>
          <b>Location</b>
          <p>{booking.eventId?.location}</p>
        </div>

        <div>
          <b>Category</b>
          <p>{booking.eventId?.category}</p>
        </div>

        <div>
          <b>Tickets</b>
          <p>{booking.numberOfTickets}</p>
        </div>

        <div>
          <b>Amount</b>
          <p>
            {booking.amount === 0
              ? "Free"
              : `₹${booking.amount}`}
          </p>
        </div>

        <div>
          <b>Status</b>
          <p
            className={
              booking.status === "confirmed"
                ? "text-green-600 font-bold"
                : booking.status === "pending"
                ? "text-yellow-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {booking.status}
          </p>
        </div>

        <div>
          <b>Payment</b>
          <p
            className={
              booking.paymentStatus === "Paid"
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {booking.paymentStatus}
          </p>
        </div>

      </div>

      {booking.status !== "cancelled" && (
        <button
          onClick={cancelBooking}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
        >
          Cancel Booking
        </button>
      )}

    </div>
  );
};

export default BookingDetails;