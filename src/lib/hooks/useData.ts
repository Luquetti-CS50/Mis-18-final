// src/lib/hooks/useData.ts
import { useEffect, useState } from "react";

export function useData<T>(getData: () => T, eventKey: string): T {
  const [data, setData] = useState<T>(() => getData());

  useEffect(() => {
    const handler = () => setData(getData());
    const eventName = `db_update_${eventKey}`;
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [getData, eventKey]);

  return data;
}
