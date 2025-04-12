import { addNewContact, deleteContact, getContacts, getContactWithID, updateContact } from '../controllers/crmController';
const routes = (app) => {
    app.route('/contact')
        .get(
            (req, res, next) => {
                // Middleware
                console.log('Response:', res);
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                next();
            },
            getContacts // Call the getContacts function after the middleware
        )

        .post((req, res) => addNewContact(req, res));

    app.route('/contact/:contactId')
        .get(getContactWithID)
        .put(updateContact)

        .delete(deleteContact)
}

export default routes;