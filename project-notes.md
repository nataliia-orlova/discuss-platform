### Steps

-   move auth from header to header-auth component - to make homepage static

-   add ability to create a new topic:

    -   add btn
    -   when clicked - popup with form and submit btn appears
    -   when form submitted - redirect to needed page
    -   receive input data in the server action via name input attr
    -   add form validation
        -   create schema - (in server actions) with zod library
        -   create interface describing returning data issues
        -   in the server action use 2 props: formState and formData
        -   make sure you return a promise from server action with a type of interface indicating type
        -   in the server action:
            -   define result variable
            -   if not successful result - return early, making sure you return intrface obj
    -   display form validation errors in the UI with useFormState hook (make sure type in component and in server action match - error object - create interface for that)
    -   save validated data in the db
    -   redirect user to a needed page
    -   display Loading with useFormStatus (create child component to use useFormStatus inside of it, because this hook looks up to parent component - where there is the form)

-   display topic list from db in the UI

    -   create topic list component, fetch topics from db and render them in UI on home page

-   add individual topic page (topicShow)
-   add ability to create a new post (see steps for create a new topic)
    -   add btn and form for gathering user inputs
-   add post to db
    -   pass slug as a prop from TopicShowPage to PostCreateForm
    -   when user submits data slug+FormData go to server action CreatePost
    -   slug is not id (we need id) - so we need to reach out to db and get slug's id
    -   add this slug id when creating a post
-   create a post in UI
    -   add post query file for functions that will access db and run a specific query
    -   find postlist component - make it expect a function that returns post with data
        -- so the parent component decides which function to run to fetch data
        -- it passes it as a prop to the child component and the child component is actually implementing fetching
