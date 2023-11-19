import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
    name: 'non_art_page',
    title: 'Non-Artwork Page',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        {
            title: 'Page Type',
            name: 'page_type',
            type: 'string',
            options: {
                list: [
                    {title: 'Friends', value: 'friends'},
                    {title: 'Process/About/Studio', value: 'process'},
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
        orderRankField({ type: 'category' }),
        {
            title: 'Page Heading',
            name: 'page_heading',
            type: 'string',
            description: 'Title/heading to appear at the top of the page',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'The slug that will appear in the URL for this page',
            // hidden: ({document}) => document?.homepage,
            // readOnly: true,
            options: {
                source: 'page_heading',
            },
            validation: Rule => Rule.required(),
        },
        {
            title: 'Blurb',
            name: 'blurb',
            type: 'text',
            description: 'A blurb describing the contents or subject matter of the page',
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
                            description: "Friend's first name",
                            required: true,
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
                            description: "Image of friend or friend's work",
                            required: true,
                        }
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
                        {
                            name: 'blurb',
                            title: 'Blurb',
                            type: 'text',
                            description: "Anything additional you'd like to add about the image"
                        }
                    ]
                }
            ]
        }
    ]
}