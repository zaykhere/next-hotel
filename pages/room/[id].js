import Home from "../../components/Home";
import Layout from "../../components/layout/Layout";
import RoomDetails from "../../components/room/RoomDetails";
import { getRoomDetails } from "../../redux/actions/roomActions";
import { wrapper } from "../../redux/store";

export default function Index() {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    });
