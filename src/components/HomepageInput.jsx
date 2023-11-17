import {Switch, Flex, Card, Label, Text, Stack} from '@sanity/ui'
import React, {useCallback} from 'react'
import { client } from '@/utils/sanity/lib/client'
import { useFormBuilder, set, unset } from 'sanity'

export const HomepageInput = (props) => {
    const { elementProps, value, onChange, schemaType } = props
    const draftId = useFormBuilder().value._id

    const handleChange = useCallback((event) => {
        const checked = event.target.checked;
        onChange(checked ? set(true) : unset());

        (async () => {
            // from context, _id can be prepended with 'draft.', but will not appear with such in GROQ queries
            const publishedId = draftId.replace(/^drafts\./, '');
            const params = { publishedId: publishedId, draftId: draftId };
            if (checked) {
                const query = `*[_type == 'art_page' && homepage == true && _id != $publishedId && _id != $draftId]`;
                const match = await client.fetch(query, params)
                if (match.length > 0) {
                    match.forEach((hp) => {
                        client
                            .patch(hp._id)
                            .set({homepage: !checked})
                            .commit()
                    })
                }
            } else if (!checked ) {
                const query = `*[_type == 'art_page' && homepage == false && _id != $publishedId && _id != $draftId][0]`
                const newHp = await client.fetch(query, params)
                if (newHp) {
                    client
                        .patch(newHp._id)
                        // .unset(['homepage'])
                        .set({homepage: checked})
                        .commit()
                }
            }
        })().catch(err => console.log(err))
    }, [draftId, onChange])


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