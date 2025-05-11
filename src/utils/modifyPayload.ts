export const modifyPayload = (values: any) => {
  const obj = { ...values };
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append("data", data);
  //   for (const [key, value] of formData.entries()) {
  //     console.log(`${key}: ${value}`);
  //   }
  return formData;
};
