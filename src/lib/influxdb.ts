import { InfluxDB } from "@influxdata/influxdb-client";

// Initialize InfluxDB client
export function getInfluxDBClient() {
  const url = process.env.INFLUXDB_ROUTE;
  const token = process.env.INFLUXDB_TOKEN;
  const org = process.env.INFLUXDB_ORG;
  const bucket = process.env.INFLUXDB_BUCKET;

  if (!url || !token || !org) {
    throw new Error("Missing InfluxDB configuration");
  }

  return {
    client: new InfluxDB({ url, token }),
    org,
    bucket,
  };
}

// Query helper function
export async function executeQuery(query: string) {
  try {
    const { client, org } = getInfluxDBClient();
    const queryApi = client.getQueryApi(org);

    return await queryApi.collectRows(query);
  } catch (error) {
    console.error("Error executing InfluxDB query:", error);
    throw error;
  }
}
