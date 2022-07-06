import React, { useState } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import IconSvg, { Icon } from 'synapse-react-client/dist/containers/IconSvg'

export type ToggleSynapseObjectsProps = {
  icon1?: Icon
  synapseObject1?: JSX.Element
  icon2?: Icon
  synapseObject2?: JSX.Element
}

enum ToggleButtonValue {
  CONFIG1 = 0,
  CONFIG2 = 1,
}

export default function ToggleSynapseObjects(props: ToggleSynapseObjectsProps) {
  const {icon1, synapseObject1, icon2, synapseObject2} = props
  const [toggleValue, setToggleValue] = useState(ToggleButtonValue.CONFIG1)
  // useEffect(() => {
    
  // }, [])
  return <>
    <ToggleButtonGroup name={'unique value for this group?'} value={toggleValue} onChange={value=>setToggleValue(value)}>
      <ToggleButton value={ToggleButtonValue.CONFIG1}>
        {icon1 && <IconSvg options={{icon: icon1}} />}
      </ToggleButton>
      <ToggleButton value={ToggleButtonValue.CONFIG2}>
        {icon2 && <IconSvg options={{icon: icon2}} />}
      </ToggleButton>
    </ToggleButtonGroup>
    {toggleValue === ToggleButtonValue.CONFIG1 && synapseObject1}
    {toggleValue === ToggleButtonValue.CONFIG2 && synapseObject2}
  </>
}
