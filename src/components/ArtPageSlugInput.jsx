'use client'

import { useEffect } from "react"
import { SlugInput } from "sanity"

function ArtPageSlugInput(props) {
    console.log(props)
    const { elementProps, onChange, document, schemaType, validation, value} = props
    console.log(elementProps)
    console.log(document)

    useEffect(() => {
        const homepage = document.querySelector('input#homepage')
        console.log(homepage)
    },[])

    const handleChange = (event) => {
        const nextValue = event.currentTarget.value;
        onChange(nextValue ? set (nextValue) : unset())
    }
    
    return (
        <>
            {/* {props.renderDefault(props)} */}
            <SlugInput 
                {...elementProps}
                schemaType={schemaType}
                validation={validation}
                value={value}
            />
        </>
    )
}

export default ArtPageSlugInput