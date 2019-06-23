import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as layout from './modules/layout/actions';
import * as address from './modules/address/actions';

export const action = {
  layout,
  address,
};

export const register = (mapStateToProps, mapDispatchToPropsCb, Component) => {
  const mapDispatchToProps = dispatch =>
    bindActionCreators(mapDispatchToPropsCb(dispatch), dispatch);

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Component)
  );
};
