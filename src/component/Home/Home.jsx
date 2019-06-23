import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
        {loading && 'Loading'}

        {error && (
          <div>
            <h3>{error.error_description}</h3>
            <p>{error.non_field_errors && error.non_field_errors.join(', ')}</p>
          </div>
        )}

        <form onSubmit={e => this.handleSubmitForm(e)}>
          Name:
          <br />
          <input type="text" name="name" required />
          <br />
          Address:
          <br />
          <input type="text" name="formattedAddress" required />
          <br />
          <input type="submit" value="Add Stop" />
        </form>

        <ol>
          {items &&
            items.map((item, i) => {
              const itemIndex = i;
              return (
                <li
                  key={`${itemIndex}_item`}
                  className={classnames({ completed: item.completed })}
                >
                  {item.name}-{item.address.formatted_address}
                  <input
                    key={
                      itemIndex + (item.completed ? 'complete' : 'incomplete')
                    }
                    type="checkbox"
                    defaultChecked={item.completed}
                    onClick={e =>
                      completeAddress({
                        address_index: i,
                        completed: e.target.checked,
                      })
                    }
                  />
                  -
                  <button
                    type="button"
                    onClick={() =>
                      openModal('address', {
                        item,
                        address_index: i,
                      })
                    }
                  >
                    edit
                  </button>
                  -
                  <button
                    type="button"
                    onClick={() => deleteAddress({ address_index: i })}
                  >
                    x
                  </button>
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
