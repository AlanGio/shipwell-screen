import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { register, action } from '../../redux';

const propTypes = {
  data: PropTypes.shape({}),
  error: PropTypes.shape({}),
  editAddress: PropTypes.func,
  closeModal: PropTypes.func,
};

const defaultProps = {
  data: {},
  error: {},
  editAddress: () => {},
  closeModal: () => {},
};

class Modal extends PureComponent {
  handleSubmitForm(event) {
    event.preventDefault();

    const { name, formattedAddress } = event.target.elements;
    const { data, editAddress } = this.props;

    editAddress({
      address_index: data.address_index,
      name: name.value,
      formattedAddress: formattedAddress.value,
    });
  }

  render() {
    const { error, data, closeModal } = this.props;
    return (
      <div className="modal">
        <button
          type="button"
          className="modal-close"
          onClick={() => closeModal()}
        >
          &times;
        </button>

        <div className="modal-content">
          <h3>Edit Address</h3>

          {error && (
            <div>
              <h3>{error.error_description}</h3>
              <p>
                {error.non_field_errors && error.non_field_errors.join(', ')}
              </p>
            </div>
          )}

          <form onSubmit={e => this.handleSubmitForm(e)}>
            Name:
            <br />
            <input
              type="text"
              name="name"
              defaultValue={data.item.name}
              required
            />
            <br />
            Address:
            <br />
            <input
              type="text"
              name="formattedAddress"
              defaultValue={data.item.address.formatted_address}
              required
            />
            <br />
            <input type="submit" value="Add Stop" />
          </form>
        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default register(
  ({ address }) => ({
    error: address.editError,
  }),
  () => ({
    editAddress: action.address.editAddress,
  }),
  Modal
);
