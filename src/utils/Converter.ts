export async function srcToFile(
  src: string,
  FileName: string,
  mimeType: string
) {
  return await fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], FileName, { type: mimeType });
    });
}
