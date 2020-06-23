import { connect } from 'react-redux';
import { fetchOption, saveOption, deleteOption} from '../../store/decisions/actions';
function mapStateToProps(state, props) {
  // get the id from the route params
  const { match: { params: { id } } } = props;
  const {
    options: {
      byId: {
        // find the key with the id from the route and pull out the decision
        [id]: option,
      },
    },
  } = state;
  return { option };
}

// map action functions to props
const mapDispatchToProps = { fetchOption, saveOption, deleteOption };
// export the redux connected version of the container
export default connect(mapStateToProps, mapDispatchToProps);
