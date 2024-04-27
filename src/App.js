import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

function App() {
  const { data, isLoading, error, fetchData } = useFetch();
  const [flag, setFlag] = useState([]);

  useEffect(() => {
    fetchData(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/626c69"
    );
  }, [fetchData]);

  useEffect(() => {
    let interval = null;
    if (data) {
      interval = setInterval(() => {
        if (data.length > flag.length) {
          const arr = Array.from(data);
          setFlag((prev) =>
            prev.concat({ id: prev.id + 1, value: arr[prev.length] })
          );
        }
      }, 500);
    }

    //Clearing the interval
    return () => clearInterval(interval);
  }, [data, flag.length]);

  if (isLoading) {
    return (
      <div aria-busy='true' role='alert'>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div aria-live='assertive' role='alert'>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div>
      <main>
        <ul>
          {flag.map((f) => (
            <li key={f.id}>{f.vaue}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
