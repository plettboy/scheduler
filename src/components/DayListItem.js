import React from 'react';
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {
    'day-list_item--selected': props.selected,
    'days-list_item--full': (props.spots === 0)
  })

  //display the number of appointment spots remaining

  const formatSpots = function (spots) {
    if (spots === 1) {
      return '1 spot remaining';
    }
    if (spots === 0) {
      return 'no spots remaining';

    }
    if (spots === 2) {
      return '2 spots remaining';
    }
    if (spots === 3) {
      return '3 spots remaining';
    }
    if (spots === 4) {
      return '4 spots remaining';
    }
    if (spots === 5) {
      return '5 spots remaining';
    }
    return `${spots} spots remain`;
  }

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}