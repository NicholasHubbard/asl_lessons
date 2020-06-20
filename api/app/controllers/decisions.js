// load in the decisions model
const { Decisions } = require('../models');

// get all the decisions
exports.getAll = async (req, res) => {
  // filter the decisions to only decisions that were created by the user
  const decisions = await Decisions.findAll({ where: { userId: req.userId } });
  // respond with json of the decisions array
  res.json(decisions);
};

// get all the decisions with a type of public
exports.getPublic = async (req, res) => {
  // run the find all function on the model
  const publicDecisions = await Decisions.findAll({ where: { type: 'public' } });
  // respond with json of the public decisions array
  res.json(publicDecisions);
};

// find one decision by id
exports.getOneById = async (req, res) => {
  // get the id from the route params
  const { id } = req.params;
  // search our decision model for the decision
  const decision = await Decisions.findByPk(id);
  // if no decision is found
  if (!decision) {
    // return 404 (not found) code
    res.sendStatus(404);
    return;
  }

  // if the decision is found send it back
  res.json(decision);
};

// add a new decision
exports.createDecision = async (req, res) => {
  // get the title and type values from the request body
  const { title, type } = req.body;

  try {
    // create the item and save the new decision
    const newDecision = await Decisions.create({ title, type, userId: req.userId });
    // send the new id back to the request
    res.json({ id: newDecision.id });
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map((err) => err.message);


    res.status(400).json({ errors });
  }
};

// update an existing decisions
exports.updateDecision = async (req, res) => {
  const { id } = req.params;
  try {
    // update the decision with the request body
    const [, [updateDecision]] = await Decisions.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });
    // send the updated decision back to the front-end
    res.json(updateDecision);
  } catch (e) {
    // map the errors messages to send them back
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// delete a decision
exports.removeDecision = async (req, res) => {
  // get the id from the route
  const { id } = req.params;
  // remove the decision
  await Decisions.destroy({ where: { id } });
  // send a good status code
  res.sendStatus(200);
};
