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
