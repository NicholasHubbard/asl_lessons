import { connect } from 'react-redux';
import { fetchDecision, saveDecision } from '../../store/decisions/actions';
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
  } = state;
  return { decision };
}

// map action functions to props
const mapDispatchToProps = { fetchDecision, saveDecision };
// export the redux connected version of the container
export default connect(mapStateToProps, mapDispatchToProps);
