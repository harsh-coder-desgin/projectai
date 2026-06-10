const request = async (url, options = {}) => {
  try {

    const res = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Request Failed");
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export default request