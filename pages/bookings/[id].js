import React from "react";
import { getSession } from "next-auth/react";
import Layout from "../../components/layout/Layout";
import BookingDetails from "../../components/booking/BookingDetails";
import { wrapper } from "../../redux/store";
import { getBookingDetails } from "../../redux/actions/bookingActions";

const myBookingsPage = () => {
  return (
    <Layout title="Booking Details">
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getBookingDetails(req.headers.cookie, req, params.id)
      );
    }
);

export default myBookingsPage;
