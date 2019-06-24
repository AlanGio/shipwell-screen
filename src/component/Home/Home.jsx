import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import classnames from 'classnames';
import { register, action } from '../../redux';

const propTypes = {
  completeAddress: PropTypes.func,
  deleteAddress: PropTypes.func,
  error: PropTypes.shape({}),
  getAddress: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape()),
  loading: PropTypes.bool,
  openModal: PropTypes.func,
};

const defaultProps = {
  completeAddress: () => {},
  deleteAddress: () => {},
  error: {},
  getAddress: () => {},
  items: {},
  loading: false,
  openModal: () => {},
};

class Home extends PureComponent {
  handleSubmitForm(event) {
    event.preventDefault();

    const { name, formattedAddress } = event.target.elements;
    const { getAddress } = this.props;

    getAddress({
      name: name.value,
      formattedAddress: formattedAddress.value,
    });
  }

  render() {
    const {
      completeAddress,
      deleteAddress,
      error,
      items,
      loading,
      openModal,
    } = this.props;

    return (
      <section className="home">
        {loading && <div className="loading row">Loading</div>}

        {error && (
          <div className="errors row">
            <h3>{error.error_description}</h3>
            <p>{error.non_field_errors && error.non_field_errors.join(', ')}</p>
          </div>
        )}

        <form onSubmit={e => this.handleSubmitForm(e)} className="row">
          <label htmlFor="name">
            <span>Name:</span>
            <input type="text" name="name" required disabled={loading} />
          </label>

          <label htmlFor="formattedAddress">
            <span>Address:</span>
            <input
              type="text"
              name="formattedAddress"
              minLength="3"
              required
              disabled={loading}
            />
          </label>

          <label htmlFor="submit">
            <input
              type="submit"
              name="submit"
              value="Add Stop"
              disabled={loading}
            />
          </label>
        </form>

        {items.length > 0 && (
          <Fragment>
            <hr />
            <h2>Items added</h2>
            <hr />
          </Fragment>
        )}

        <ol className="row">
          {items &&
            items.map((item, i) => {
              const itemIndex = i;
              return (
                <li
                  key={`${itemIndex}_item`}
                  className={classnames({ completed: item.completed })}
                >
                  <label className="container" htmlFor={`${itemIndex}_item`}>
                    <input
                      key={
                        itemIndex + (item.completed ? 'complete' : 'incomplete')
                      }
                      id={`${itemIndex}_item`}
                      type="checkbox"
                      defaultChecked={item.completed}
                      onClick={e =>
                        completeAddress({
                          address_index: i,
                          completed: e.target.checked,
                        })
                      }
                    />
                    <span className="checkmark" />
                    <h2>{item.name}</h2>
                    <h3>{item.address.formatted_address}</h3>
                  </label>
                  <div className="button-actions">
                    <button
                      type="button"
                      onClick={() =>
                        openModal('address', {
                          item,
                          address_index: i,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteAddress({ address_index: i })}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
        </ol>
      </section>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default register(
  ({ address }) => ({
    items: address.items,
    loading: address.loading,
    error: address.error,
  }),
  () => ({
    openModal: action.layout.openModal,
    getAddress: action.address.getAddress,
    completeAddress: action.address.completeAddress,
    deleteAddress: action.address.deleteAddress,
  }),
  Home
);
