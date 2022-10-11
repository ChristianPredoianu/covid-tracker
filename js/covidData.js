export async function fetchData(url) {
  try {
    const response = await fetch(
      'https://coronavirus-19-api.herokuapp.com/countries'
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
