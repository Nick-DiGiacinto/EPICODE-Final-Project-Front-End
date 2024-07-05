// FUNZIONE DI LOGIN

export const authRequest = (formUsernameValue, formPswValue) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:8090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formUsernameValue,
          password: formPswValue,
        }),
      });
      if (response.ok) {
        const data = (await response).json();
        const value = await data.then((e) => e);
        dispatch({
          type: "ADD_TOKEN",
          payload: value,
        });
      } else {
        console.log("response not OK");
        dispatch({
          type: "NOT_FOUND",
          payload: true,
        });
      }
    } catch (error) {
      console.log("Sono catch", error);

      return error;
    }
  };
};
