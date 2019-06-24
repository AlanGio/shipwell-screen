import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classnames from 'classnames';
import Modal from '../Modal';
import { register, action } from '../../redux';

const propTypes = {
  modal: PropTypes.shape({}),
  closeModal: PropTypes.func,
  children: PropTypes.shape({}),
};

const defaultProps = {
  modal: {},
  closeModal: () => {},
  children: {},
};

const Layout = ({ modal: { name, data }, closeModal, children }) => (
  <Fragment>
    <h1>Shipment itinerary</h1>
    <div className="content-wrap">{children}</div>
    <div className={classnames('overlay-wrap', { 'modal-open': name })}>
      {name && <Modal name={name} data={data} closeModal={closeModal} />}
    </div>
  </Fragment>
);

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default register(
  ({ layout }) => ({
    modal: layout.modal,
  }),
  () => ({
    closeModal: action.layout.closeModal,
  }),
  Layout
);
