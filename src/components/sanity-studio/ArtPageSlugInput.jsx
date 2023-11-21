import { useEffect } from "react"
import { SlugInput } from "sanity"

function ArtPageSlugInput(props) {
  const { elementProps, onChange, schemaType, validation, value} = props
  
  useEffect(() => {
      const homepage = document.querySelector('input#homepage')
  },[])

  const handleChange = (event) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set (nextValue) : unset())
  }
  
  return (
      
          <SlugInput 
              {...elementProps}
              schemaType={schemaType}
              validation={validation}
              value={value}
          ></SlugInput>
      
  )
}

export default ArtPageSlugInput