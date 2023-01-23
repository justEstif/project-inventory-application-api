import got from "got";

const verifyImageUrl = async (url: string) => {
  const imageTypes = [
    "image/gif",
    "image/jpeg",
    "image/png",
    "image/tiff",
    "image/vnd.microsoft.icon",
    "image/x-icon",
    "image/vnd.djvu",
    "image/svg+xml",
  ];
  const res = await got.head(url);
  const type = res.headers["content-type"];
  return type && imageTypes.includes(type);
};

export default verifyImageUrl;
