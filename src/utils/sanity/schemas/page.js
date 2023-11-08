export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        {
            title: 'Page Type',
            name: 'page_type',
            type: 'string',
            options: {
                list: [
                    {title: 'Friends', value: 'friends'},
                    {title: 'Process/About/Studio', value: 'process'},
                    {title: 'Artwork', value: 'artwork'}
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        },
        {
            title: 'Nav Title',
            name: 'nav_title',
            type: 'string',
            description: 'The page title to appear in the navigation menu',
            validation: Rule => Rule.required()
        },
        {
            title: 'Page Heading',
            name: 'page_heading',
            type: 'string',
            description: 'Title/heading to appear at the top of the page',
            validation: Rule => Rule.required()
        },
        {
            title: 'Blurb',
            name: 'blurb',
            type: 'text',
            description: 'A blurb describing the contents or subject matter of the page',
            hidden: ({document}) => document?.page_type === 'artwork'
        },
        {
            name: 'friends_gallery',
            title: 'Friends Gallery',
            type: 'array',
            description: 'A gallery of friends',
            hidden: ({document}) => document?.page_type !== 'friends',
            of: [
                {
                    name: 'friend',
                    type: 'document',
                    title: 'Friend',
                    fields: [
                        {
                            name: 'first_name',
                            title: 'First Name',
                            type: 'string',
                            description: "Friend's first name"
                        },
                        {
                            name: 'last_name',
                            title: 'Last Name',
                            type: 'string',
                            description: "Friend's last name"
                        },
                        {
                            name: 'blurb',
                            title: 'Blurb',
                            type: 'text',
                            description: 'Blurb about friend'
                        },
                        {
                            name: 'friend_url',
                            type: 'url',
                            title: "URL",
                            description: "Link to friend's work/website"
                        },
                        {
                            name: 'Photo',
                            type: 'image',
                            title: 'Photo',
                            description: "Image of friend or friend's work"
                        }
                    ]
                }
            ]
        },
        {
            name: 'art_gallery',
            title: 'Art Gallery',
            type: 'array',
            description: 'A gallery of artwork to be featured on this page',
            hidden: ({document}) => document?.page_type !== 'artwork',
            of: [
                {
                    name: 'artwork',
                    type: 'document',
                    title: 'Artwork',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            description: 'Image of the artwork',
                            fields: [
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
                            ]
                        },
                    ]
                }
            ]
        },
        {
            name: 'process_gallery',
            title: 'Process/Studio Gallery',
            type: 'array',
            description: 'A gallery of process/studio photos to be featured on this page',
            hidden: ({document}) => document?.page_type !== 'process',
            of: [
                {
                    name: 'process_image',
                    title: 'Studio/Process Image',
                    type: 'document',
                    fields: [
                        {
                            name: 'process_image',
                            title: 'Process/Studio Photo',
                            type: 'image',
                            required: true,
                            fields: [
                                {
                                    name: 'caption',
                                    title: 'Caption',
                                    type: 'text',
                                    description: 'A caption for the image'
                                },
                                {
                                    name: 'attribution',
                                    title: 'Attribution',
                                    type: 'string',
                                    description: 'Attribution if the photo was taken by someone else'
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
}