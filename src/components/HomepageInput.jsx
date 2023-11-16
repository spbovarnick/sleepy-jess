import {Switch, Flex, Card, Label, Text, Stack} from '@sanity/ui'
import React, {useCallback} from 'react'
import { client } from '@/utils/sanity/lib/client'
import { useFormBuilder, set, unset } from 'sanity'

export const HomepageInput = (props) => {
    console.log(props)
    const { elementProps, value, onChange, schemaType } = props
    const currentId = useFormBuilder().value._id
    console.log(currentId)

    const handleChange = useCallback((event) => {
        const checked = event.target.checked;
        onChange(checked ? set(true) : set(false));

        (async () => {
            // from context, _id can be prepended with 'draft.', but will not appear with such in GROQ queries
            const rawId = currentId;
            console.log(rawId)
            const docId = rawId.replace(/^drafts\./, '');
            console.log(docId)
            const params = { docId: docId };
            if (checked) {
                const query = `*[_type == 'art_page' && homepage == true && _id != $docId]`;
                const match = await client.fetch(query, params)   
                if (match.length > 0) {
                    match.forEach((hp) => {
                        client
                            .patch(hp._id)
                            .set({homepage: false})
                            .commit()
                    })
                }
            } else if (!checked ) {
                const query = `*[_type == 'art_page' && homepage == false && _id != $docId][0]`
                const newHp = await client.fetch(query, params)
                if (newHp) {
                    client
                        .patch(newHp._id)
                        .set({homepage: true})
                        .commit()
                }
            }
        })().catch(err => console.log(err))
    }, [currentId, onChange])


    return (
        <Stack padding={2} space={4}>
            <Flex direction='row-reverse' gap={4}>
                    <Stack space={2}>
                        {schemaType.title && 
                            <Label size={2} style={{fontWeight: 'bold' }}>{schemaType.title}</Label>
                        }
                        {schemaType.description && 
                            <Text size={1} muted={true} >{schemaType.description}</Text>
                        }
                    </Stack>
                <Switch 
                    {...elementProps}
                    checked={value || false}
                    onChange={handleChange}
                    readOnly={schemaType.readOnly}
                />
            </Flex>
        </Stack>
    )
}