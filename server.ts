import express from "express";
import { createDebugLog } from "./lib/stdout";
import apirouter from "./api";
import Axios from "axios";
import TokenService from "./lib/TokenService";

const debug = createDebugLog("server");

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
  let endpoint = "https://www.fflogs.com/api/v2/client";

  const getCharacter = async (id: number, token: string) => {
    const query = `query fetchCharacter($canonicalId: Int!)
  {
    characterData {
        character(
          name: "Stuff Stuff"
          serverSlug: "Faerie"
          serverRegion: "NA"
          id: $canonicalId
        ) {
          id
        canonicalID
        name
  
        server {
          name
          region {
            name
          }
        }
      }
    }
  }
  `;

    let res = await Axios.post(
      endpoint,
      JSON.stringify({
        query,
        variables: { canonicalId: id },
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!res.data) return;

    return res.data;
  };

  const token = await TokenService.getToken();

  const characterData = await getCharacter(15477431, token);

  debug(`Fetched character %j`, characterData);

  debug(`Listening on port ${port}`);
});

app.use("/api", apirouter);

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
