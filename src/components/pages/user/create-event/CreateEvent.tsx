import { useNavigate } from "react-router-dom";
import { CreateEvent } from "../../../../models/CreateEvent";

import CreateEventForm from "../../../organisms/create-event-form/CreateEventForm";
export default function CreateEventPage() {
  // const state = useRegisterEmployer();
  const navigate = useNavigate();

  return (
    <CreateEventForm
      onSubmit={async (createEvent: CreateEvent) => {
        console.log({ createEvent });
        navigate("/login", { replace: true });
      }}
      onBackClick={() => navigate("/register")}
    />
  );
}
