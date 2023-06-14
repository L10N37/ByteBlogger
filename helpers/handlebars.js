const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
};

  
  module.exports = { formatDate };
  
  // change to AU