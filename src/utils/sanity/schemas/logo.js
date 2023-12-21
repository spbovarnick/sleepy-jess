export default {
    name: 'logo',
    type: 'document',
    title: 'Logo',
    fields: [
        {
            name: 'logo',
            type: 'image',
            title: 'Logo',
            description: 'The logo that will appear in the nav menu'
        },
    ],
    preview: {
        select: {
            title: 'logo.asset.originalFilename',
            media: 'logo'
        }
    }
}