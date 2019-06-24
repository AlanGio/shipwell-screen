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
          <h2>Edit Address</h2>

          {error && (
            <div>
              <h3>{error.error_description}</h3>
              <p>
                {error.non_field_errors && error.non_field_errors.join(', ')}
              </p>
            </div>
          )}

          <form onSubmit={e => this.handleSubmitForm(e)} className="row">
            <label htmlFor="name">
              <span>Name:</span>
              <input
                type="text"
                name="name"
                required
                defaultValue={data.item.name}
              />
            </label>

            <label htmlFor="formattedAddress">
              <span>Address:</span>
              <input
                type="text"
                name="formattedAddress"
                minLength="3"
                required
                defaultValue={data.item.address.formatted_address}
              />
            </label>
            <label htmlFor="submit">
              <input
                type="button"
                name="cancel"
                value="Cancel"
                onClick={() => closeModal()}
              />
              <input type="submit" name="submit" value="Save Stop" />
            </label>
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
