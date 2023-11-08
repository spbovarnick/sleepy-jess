export default {
    name: 'artwork',
    type: 'document',
    title: 'Artwork',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Image of the artwork',
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
            description: "The date the work was completed, or first shown (don't worry about the day)"
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The title of the work'
        },
        {
            name: 'width',
            title: 'Width',
            type: 'number',
            description: 'Width of the work in inches',
            validation: Rule => Rule.positive()
        },
        {
            name: 'height',
            title: 'Height',
            type: 'number',
            description: 'Height of the work in inches',
            validation: Rule => Rule.positive()
        },
        {
            name: 'blurb',
            title: 'Blurb',
            type: 'text',
            description: 'A short blurb about the work'
        },
        {
            name: 'medium',
            title: 'Medium',
            type: 'string',
            description: 'Information about the media used to create the work'
        },
        {
            name: 'page',
            type: 'reference',
            title: 'Page',
            to: [{type: 'artPage'}]
        }
    ]
}