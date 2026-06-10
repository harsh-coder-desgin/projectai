const request = async (url,options) => {
  console.log(url,options);
  
  try {
    const res = await fetch(url, {
      method:options.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: options.body,
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