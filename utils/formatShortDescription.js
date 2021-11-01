const formatDescription = (value) => {
  let newValue = value.toString();
  newValue.replace(/\\n/gm, " ");
  newValue.replace(/\n/gm, " ");
  // console.log(newValue);
  if (newValue.length > 400)
    return (newValue = [].slice(0, 399).toString()) + "...";
  return newValue + "...";
};

export default formatDescription;
