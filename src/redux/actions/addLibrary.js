// RECUPERO LIBRERIA UTENTE
export const recuperaLibreria = (id, token) => {
  return async (dispatch) => {
    console.log("ID:", id);
    try {
      const response = await fetch(`http://localhost:8090/library/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("SONO RESPONSE", response);
      if (response.ok) {
        const data = await response.json();

        dispatch({
          type: "SAVE_LIBRARY",
          payload: data,
        });
        console.log("DATA", data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
};
