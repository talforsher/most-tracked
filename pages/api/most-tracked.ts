import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return axios.get("https://www.flightradar24.com/flights/most-tracked", {
    headers: {
      "User-Agent": req.headers["user-agent"],
    },
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
}
