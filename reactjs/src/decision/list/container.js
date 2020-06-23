import { connect } from 'react-redux';
// pull actions out that we want to use in this component
import { fetchUserDecisions } from '../../store/decisions/actions';
function mapStateToProps(state) {
  // pull the data we need out of the current state
  const { decisions: { userDecisions, byId } } = state;
  // using the array of ids, turn the ids into the decisions using the by id object
  const mappedDecisions = userDecisions.map(id => byId[id]);
  // return a new object that will be added to the props
  return { userDecisions: mappedDecisions };
}

// map action functions to props
const mapDispatchToProps = { fetchUserDecisions };
// export the redux connected version of the container
export default connect(mapStateToProps, mapDispatchToProps);
