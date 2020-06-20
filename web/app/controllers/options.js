exports.renderOptionForm = (req, res) => {
  res.render('options/form', { value: '' });
};

// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderOptionFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { value } = req.body;
  // send the value and errors as variables to the view
  res.render('options/form', { value, errors });
};

exports.saveOption = async (req, res) => {
  // get the data the user submitted
  const { value } = req.body;
  // pull the id from the url
  const { id } = req.params;
  // pull the decision id from the url query string
  const { decisionId } = req.query;
  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    await req.API.put(`/options/${id}`, { value, decisionId });
  } else {
    // send the new option to the api
    await req.API.post('/options', { value, decisionId });
  }

  // redirect to the edit option form
  res.redirect(`/admin/decisions/${decisionId}`);
};

exports.renderEditForm = async (req, res) => {
  // the the id from the url
  const { id } = req.params;
  // get the details of the option
  const option = await req.API.get(`/options/${id}`);
  // render the edit form
  res.render('options/form', option);
};

// four params are required to mark this as an error handling middleware
// eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect send them back to the page they came from
  res.redirect('back');
};

exports.deleteOption = async (req, res) => {
  // the id from the url
  const { id } = req.params;
  // pull the decision id from the url query string
  const { decisionId } = req.query;
  // send the delete request to the api
  await req.API.delete(`/options/${id}`);
  // redirect to the decision detail page
  res.redirect(`/admin/decisions/${decisionId}`);
};
