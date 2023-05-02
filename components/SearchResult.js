function SearchResult({ searchResults }) {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div key={result.id}>
            <h2>{result.name}</h2>
            <p>{result.type}</p>
            {result.external_url && (
              <p>
                <Link href={result.external_url} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    Open on Spotify
                  </a>
                </Link>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}