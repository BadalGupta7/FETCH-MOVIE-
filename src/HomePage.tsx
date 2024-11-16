import { useEffect, useState } from 'react';

const HomePage = () => {
  const [movieList, setMoviesList] = useState({});
  const [input, setInput] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  console.log('movieList', movieList);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=efb3119d&T=${input}`
        );
        const result = await res.json();
        // const res = await fetch('http://www.omdbapi.com/');
        // const result = await res.json();
        console.log('result', result);
        setMoviesList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    input ? fetchMovie() : setMoviesList({});
    setOpenModal(false);
  }, [input]);

  const onClickPoster = () => {
    setOpenModal(true);
    // setInput('');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div>HOMEPAGE</div>
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="SEARCH MOVIES"
          list="data"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid gray',
          }}
        />
      </div>
      <div
        style={{
          height: '400px',
          position: 'relative',
        }}
      >
        {loading ? (
          <div style={{ fontSize: '20px', marginTop: '50px' }}>Loading...</div>
        ) : (
          <div>
            {openModal && (
              <table
                border={1}
                style={{
                  marginTop: '100px',
                  marginLeft: '50px',
                  display: openModal ? '' : 'none',
                  position: 'absolute',
                  backgroundColor: 'white',
                }}
              >
                <thead>
                  <tr>
                    <th colSpan={2}>{movieList?.Title}</th>
                    <th>
                      <button
                        onClick={() => setOpenModal(false)}
                        style={{
                          backgroundColor: 'grey',
                          border: 'none',
                          color: 'white',
                          padding: '5px',
                          borderRadius: '3px',
                          cursor: 'pointer',
                        }}
                      >
                        X
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GENRE</td>
                    <td>{movieList?.Genre}</td>
                  </tr>
                  <tr>
                    <td>YEAR</td>
                    <td>{movieList?.Year}</td>
                  </tr>
                  <tr>
                    <td>RELEASED</td>
                    <td>{movieList?.Released}</td>
                  </tr>
                  <tr>
                    <td>DIRECTOR</td>
                    <td>{movieList?.Director}</td>
                  </tr>
                </tbody>
              </table>
            )}
            {movieList?.Poster ? (
              <img
                src={movieList?.Poster}
                alt="Movie Poster"
                onClick={onClickPoster}
                style={{
                  maxWidth: '100%',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
