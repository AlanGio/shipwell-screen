import React, { Fragment } from 'react';
import classnames from 'classnames';
import Modal from '../Modal';
import { register, action } from '../../redux';

const Layout = ({ modal: { name, data }, closeModal, children }) => [
  <Fragment>
    <h1>Shipment Itinerary</h1>
    <div className="content-wrap" key="content-wrap">
      {children}
    </div>
  </Fragment>,
  <div
    className={classnames('overlay-wrap', { 'modal-open': name })}
    key="overlay-wrap"
  >
    {name && <Modal name={name} data={data} closeModal={closeModal} />}
  </div>,
];

export default register(
  ({ layout }) => ({
    modal: layout.modal,
  }),
  () => ({
    closeModal: action.layout.closeModal,
  }),
  Layout
);
