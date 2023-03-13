import PropTypes from 'prop-types'

enum ControlTypes {
  Start = 'start',
  Control = 'control',
  Finish = 'finish'
}

interface Props {
  controlType: ControlTypes
  visited: boolean
}

const Control: React.FunctionComponent<Props> = ({ controlType, visited }) => {
  const stroke = visited ? 'blue' : 'red'
  return (
    <div>
      <svg
        width="60"
        height="60"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {controlType === 'start' && (
          <polygon
            points="0,60, 30,0 60,60"
            stroke={stroke}
            fill="none"
            strokeWidth="5"
          />
        )}
        {controlType === 'control' && (
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke={stroke}
            fill="none"
            strokeWidth="5"
          />
        )}
        {controlType === 'finish' && (
          <>
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke={stroke}
              fill="none"
              strokeWidth="5"
            />
            <circle
              cx="30"
              cy="30"
              r="15"
              stroke={stroke}
              fill="none"
              strokeWidth="1"
            />
          </>
        )}
      </svg>
    </div>
  )
}

Control.propTypes = {
  controlType: PropTypes.oneOf([ControlTypes.Start, ControlTypes.Control, ControlTypes.Finish]).isRequired,
  visited: PropTypes.bool.isRequired
}

export { Control, ControlTypes }
