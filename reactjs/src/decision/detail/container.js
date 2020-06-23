import { connect } from 'react-redux';
import { fetchDecision, deleteDecision } from '../../store/decisions/actions';
function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    decisions: {
      byId: {
        // find the key with the id from the route and pull out the decision
        [id]: decision,
      },
    },
    options: {
      byDecisionId: {
        // find the key with the id an pull out the array of options for this decision
        [id]: decisionOptions = [],
      },
      byId,
    },
  } = state;

  // map the array of option ids to their option objects
  const options = decisionOptions.map(optionOd => byId[optionId]);

  return { decision, options };
}

// map action functions to props
const mapDispatchToProps = { fetchDecision, deleteDecision };
// export the redux connected version of the container
export default connect(mapStateToProps, mapDispatchToProps);
