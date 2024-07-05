const getUsers = (username, token) => {
  return async (dispatch) => {
    console.log("Username: ", username, "token", token);
    try {
      const response = await fetch(
        `http://localhost:8090/api/auth/checkout/find/${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch({
          type: "GET_USER",
          payload: data,
        });
      } else {
        throw new Error("Errore, response non ok");
      }
    } catch (error) {
      console.log("Sono catch", error);
    }
  };
};

export default getUsers;
