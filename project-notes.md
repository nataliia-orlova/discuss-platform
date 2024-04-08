### Steps

-   move auth from header to header-auth component - to make homepage static

-   add ability to create a new topic:
    -   add btn
    -   when clicked - popup with form and submit btn appears
    -   when form submitted - redirect to needed page
    -   receive input data in the server action via name input attr
    -   add form validation (in server actions) with zod library
    -   display form validation errors in the UI with useFormState hook (make sure type in component and in server action match - error object - create interface for that)
