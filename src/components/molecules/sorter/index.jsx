import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import { AnchorButton } from 'components/atoms/button';
import { Sorter as SorterPropType } from 'typedefs';
import { useClickOutside } from 'components/hooks';

const propTypes = {
  className: PropTypes.string,
  sorter: SorterPropType,
};

/**
 * Renders a sorter component.
 * Dependent on the `Button` component.
 */
const Sorter = ({
  className,
  sorter: {
    orders,
    selectedOrder,
  },
}) => {
  const [toggled, setToggled] = React.useState(false);
  const sorterRef = React.useRef();

  const handleSorterClick = e => {
    if (!toggled || e.target.className.includes('selected')) {
      e.preventDefault();
      if(!toggled) setToggled(true);
      else setToggled(false);
    }
  };

  useClickOutside(sorterRef, () => { setToggled(false); });

  return (
    <div
      className={ trimWhiteSpace`sorter
        ${className}
        ${toggled ? 'open' : ''}
      ` }
      ref={ sorterRef }
    >
      <div className='sorter-inner'>
        {
          orders
            .sort((a, b) => a.title === selectedOrder ? -1 : b.title === selectedOrder ? 1 : 0)
            .map(order => (
              <AnchorButton
                key={ `${order.url}` }
                className={ trimWhiteSpace`order-btn
                ${order.title === selectedOrder ? `selected icon ${toggled ? 'icon-chevron-up' : 'icon-chevron-down'}` : ''}
              ` }
                onClick={ e => handleSorterClick(e) }
                link={ {
                  internal: true,
                  url: order.url,
                } }>
                { order.title }
              </AnchorButton>
            ))
        }
      </div>
    </div>
  );
};

Sorter.propTypes = propTypes;

export default Sorter;