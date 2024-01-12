export default {
    name: 'logo',
    type: 'document',
    title: 'Logo',
    fields: [
        {
            name: 'logo',
            type: 'image',
            title: 'Logo',
            description: 'The logo that will appear in the nav menu',
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    description: 'The alt text for the logo image',
                    validation: Rule => Rule.required()
                }
            ]
        },
    ],
    preview: {
        select: {
            title: 'logo.asset.originalFilename',
            media: 'logo'
        }
    }
}