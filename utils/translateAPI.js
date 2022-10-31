import axios from "axios";

const translateAPI = async (inputData, source, target) => {
  try {
    const params = new URLSearchParams();
    params.append("q", inputData);
    params.append("source", source);
    params.append("target", target);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    let res = await axios.post("https://libretranslate.com/translate", params, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  } catch (error) {
    return new Error(" API giving error");
  }
};

export default translateAPI;
