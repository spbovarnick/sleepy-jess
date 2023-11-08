export default {
    name: 'artPage',
    type: 'document',
    title: 'Art Page',
    fields: [
        {
            title: 'Nav Title',
            name: 'nav_title',
            type: 'string',
            description: 'The page title to appear in the navigation menu'
        },
        {
            title: 'Page Heading',
            name: 'page_heading',
            type: 'string',
            description: 'Title/heading to appear at the top of the page'
        },
        {
            title: 'Medium',
            name: 'medium',
            type: 'string',
            description: 'The medium under which you want to categorize the work e.g. painting, illustration, etc'
        }
    ]
}