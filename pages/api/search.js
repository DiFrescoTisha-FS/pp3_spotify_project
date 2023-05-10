import fetch from 'isomorphic-unfetch';

export default async function handler(req, res) {
  const { q } = req.query;
  const searchType = 'playlist'; // default search type
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?query=${q}&type=${searchType}&limit=10`,
      {
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    const results = data[searchType + 's'].items;
    if (results.length === 0) {
      res.status(404).json({ message: `No results found for ${q}.` });
    } else {
      res.status(200).json({ results });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}
