import { DivIcon } from 'leaflet'
import { renderToString } from 'react-dom/server'

import { Control, type ControlTypes } from '../components/Control'

/**
 * SUMMARY: Used to construct an 'Icon' object for a control.
 *
 * @param controlType A control is either the start of a race, the finish or a required check point.
 * @param visited Whether the user has visited a control.
 * @returns A Leaflet icon that denotes a control position on the map.
 */
export const generateIcon = (controlType: ControlTypes, visited: boolean): DivIcon => {
  return new DivIcon({
    html: renderToString(
      <Control controlType={controlType} visited={visited} />
    ),
    iconSize: [60, 60],
    className: 'control'
  })
}
