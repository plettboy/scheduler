import React from 'react';
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

    const dayClass = classNames('day-list__item', {
      'day-list_item--selected': props.selected,
      'days-list_item--full': (props.spots === 0)
    })


    const formatSpots = function(spots) {
      if (spots === 1) {
        return '1 spot left';
      }
      if (spots === 0) {
        return '0 spots remaining';
      }
      return `${spots} spots remain`;
    }
  
    return (
      <li className={dayClass} onClick={() => props.setDay(props.name)}>
        <h2 className='text--regular'>{props.name}</h2>
        <h3 className='text--light'>{formatSpots(props.spots)}</h3>
      </li>
    );
  }