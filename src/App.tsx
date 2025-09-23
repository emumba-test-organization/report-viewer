import { useEffect, useState } from "react";
import ParticipantReport from "./ParticipantReport";
import PhysicianReport from "./PhysicianReport";

const currentPath = () => window.location.pathname.replace("/", "");

function App() {
  const [currentUrl, setCurrentUrl] = useState(currentPath());

  useEffect(() => {
    setCurrentUrl(currentPath());
  }, []);

  if (currentUrl === "participant") {
    return <ParticipantReport />;
  } else if (currentUrl === "physician") {
    return <PhysicianReport />;
  }
}

export default App;
