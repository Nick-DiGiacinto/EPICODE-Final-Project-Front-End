const getUsers = (token) => {
  return async () => {
    try {
      const response = await fetch(
        `http://localhost:8090/api/auth/checkout/find/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("PIPPO", data);
      } else {
        throw new Error("Errore, response non ok");
      }
    } catch (error) {
      console.log("Sono catch", error);
    }
  };
};

export default getUsers;
